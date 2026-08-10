// ============================================================
// PK MEDIA OS — Document storage service (private buckets)
// Files are PRIVATE. Object paths are {organization_id}/{filename}.
// Access is authorized by RLS storage policies using the caller's
// authenticated session. Stored filenames are randomized — never
// user-supplied — to avoid predictable public URLs.
// ============================================================
import { supabase } from '../../lib/supabase'
import { dataSource } from '../config/dataSource'

export type DocumentBucket = 'contracts' | 'invoices' | 'proposals' | 'campaign-assets' | 'reports'

function randomName(original: string): string {
  const ext = original.includes('.') ? original.split('.').pop() : ''
  const base = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  return ext ? `${base}.${ext}` : base
}

/** Upload a private file. Returns the storage path on success. */
export async function uploadPrivateDocument(
  bucket: DocumentBucket,
  organizationId: string,
  file: File,
): Promise<{ path?: string; error?: string }> {
  if (dataSource !== 'supabase' || !supabase) {
    return { error: 'File storage is only available when Supabase is configured.' }
  }
  const name = randomName(file.name)
  const path = `${organizationId}/${name}`
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) return { error: error.message }
  return { path }
}

/** Get a signed URL for private access (short-lived, RLS-authorized). */
export async function getSignedUrl(bucket: DocumentBucket, path: string): Promise<string | null> {
  if (dataSource !== 'supabase' || !supabase || !path) return null
  const { data } = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 15)
  return data?.signedUrl ?? null
}

/** Delete a private file. */
export async function deletePrivateDocument(bucket: DocumentBucket, path: string): Promise<void> {
  if (dataSource !== 'supabase' || !supabase || !path) return
  await supabase.storage.from(bucket).remove([path])
}
