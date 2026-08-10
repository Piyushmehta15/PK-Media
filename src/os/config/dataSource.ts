// ============================================================
// PK MEDIA OS — Data source switch
// Controlled ENTIRELY by environment configuration.
//
//   - No VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY  -> MOCK mode
//   - Present                                         -> SUPABASE mode
//
// No application code changes are needed to switch. This is the only
// place that decides which backend the service layer talks to.
// ============================================================
import { SUPABASE_CONFIGURED } from '../../lib/supabase'

export type DataSource = 'mock' | 'supabase'

export const dataSource: DataSource = SUPABASE_CONFIGURED ? 'supabase' : 'mock'

export const isSupabaseMode = (): boolean => dataSource === 'supabase'
export const isMockMode = (): boolean => dataSource === 'mock'
