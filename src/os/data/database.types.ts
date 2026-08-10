// ============================================================
// PK MEDIA OS — Supabase Database types (generated-style)
// Mirrors supabase/migrations/*.sql. Kept in sync manually so the
// frontend is strongly typed. The public anon client enforces RLS;
// these types reflect the server schema for the tables the app reads.
// ============================================================

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: { id: string; name: string; website: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; name: string; website?: string | null }
        Update: { name?: string; website?: string | null }
      }
      profiles: {
        Row: {
          id: string; email: string; full_name: string; avatar_url: string | null
          role: string; organization_id: string; is_active: boolean
          created_at: string; updated_at: string
        }
        Insert: {
          id: string; email: string; full_name: string; avatar_url?: string | null
          role?: string; organization_id: string; is_active?: boolean
        }
        Update: { full_name?: string; avatar_url?: string | null; role?: string; is_active?: boolean; organization_id?: string }
      }
      brands: {
        Row: {
          id: string; organization_id: string; name: string; contact_person: string
          email: string; phone: string; website: string; industry: string; budget: string
          active_campaigns: number; previous_campaigns: number; notes: string
          payment_status: string; created_at: string; updated_at: string
        }
        Insert: {
          id?: string; organization_id: string; name: string; contact_person?: string
          email?: string; phone?: string; website?: string; industry?: string; budget?: string
          active_campaigns?: number; previous_campaigns?: number; notes?: string
          payment_status?: string
        }
        Update: Partial<Database['public']['Tables']['brands']['Insert']>
      }
      influencers: {
        Row: {
          id: string; organization_id: string; name: string; username: string; platform: string
          niche: string; location: string; followers: number; engagement_rate: number
          email: string; phone: string; rate: number; status: string; notes: string
          tags: string[]; created_at: string; updated_at: string
        }
        Insert: {
          id?: string; organization_id: string; name: string; username: string; platform: string
          niche?: string; location?: string; followers?: number; engagement_rate?: number
          email?: string; phone?: string; rate?: number; status?: string; notes?: string; tags?: string[]
        }
        Update: Partial<Database['public']['Tables']['influencers']['Insert']>
      }
      campaigns: {
        Row: {
          id: string; organization_id: string; name: string; client: string; budget: number
          start_date: string; end_date: string; status: string; content_status: number
          revenue: number; expenses: number; results_reach: number; results_views: number
          results_engagement: number; results_conversions: number
          created_at: string; updated_at: string
        }
        Insert: {
          id?: string; organization_id: string; name: string; client: string; budget?: number
          start_date?: string; end_date?: string; status?: string; content_status?: number
          revenue?: number; expenses?: number; results_reach?: number; results_views?: number
          results_engagement?: number; results_conversions?: number
        }
        Update: Partial<Database['public']['Tables']['campaigns']['Insert']>
      }
      campaign_influencers: {
        Row: { id: string; organization_id: string; campaign_id: string; influencer_id: string; fee: number; status: string; created_at: string }
        Insert: { id?: string; organization_id: string; campaign_id: string; influencer_id: string; fee?: number; status?: string }
        Update: Partial<Database['public']['Tables']['campaign_influencers']['Insert']>
      }
      outreach: {
        Row: { id: string; organization_id: string; influencer_id: string; campaign_id: string | null; subject: string; message: string; channel: string; status: string; sent_at: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; organization_id: string; influencer_id: string; campaign_id?: string | null; subject: string; message: string; channel?: string; status?: string; sent_at?: string | null }
        Update: Partial<Database['public']['Tables']['outreach']['Insert']>
      }
      follow_ups: {
        Row: { id: string; organization_id: string; influencer_id: string; outreach_id: string | null; due_date: string; note: string; status: string; created_at: string; updated_at: string }
        Insert: { id?: string; organization_id: string; influencer_id: string; outreach_id?: string | null; due_date: string; note: string; status?: string }
        Update: Partial<Database['public']['Tables']['follow_ups']['Insert']>
      }
      deliverables: {
        Row: { id: string; organization_id: string; campaign_id: string; influencer_id: string; title: string; type: string; status: string; due_date: string; link: string; created_at: string; updated_at: string }
        Insert: { id?: string; organization_id: string; campaign_id: string; influencer_id: string; title: string; type?: string; status?: string; due_date?: string; link?: string }
        Update: Partial<Database['public']['Tables']['deliverables']['Insert']>
      }
      deliverable_results: {
        Row: { id: string; organization_id: string; deliverable_id: string; result_type: string; value: number; note: string; created_at: string }
        Insert: { id?: string; organization_id: string; deliverable_id: string; result_type: string; value: number; note?: string }
        Update: Partial<Database['public']['Tables']['deliverable_results']['Insert']>
      }
      proposals: {
        Row: { id: string; organization_id: string; brand_id: string; title: string; amount: number; status: string; created_at: string; updated_at: string }
        Insert: { id?: string; organization_id: string; brand_id: string; title: string; amount: number; status?: string }
        Update: Partial<Database['public']['Tables']['proposals']['Insert']>
      }
      contracts: {
        Row: { id: string; organization_id: string; brand_id: string; campaign_id: string | null; title: string; status: string; created_at: string; updated_at: string }
        Insert: { id?: string; organization_id: string; brand_id: string; campaign_id?: string | null; title: string; status?: string }
        Update: Partial<Database['public']['Tables']['contracts']['Insert']>
      }
      invoices: {
        Row: { id: string; organization_id: string; brand_id: string; campaign_id: string | null; number: string; amount: number; status: string; issued_at: string; due_at: string; created_at: string; updated_at: string }
        Insert: { id?: string; organization_id: string; brand_id: string; campaign_id?: string | null; number: string; amount: number; status?: string; issued_at?: string; due_at?: string }
        Update: Partial<Database['public']['Tables']['invoices']['Insert']>
      }
      payments: {
        Row: { id: string; organization_id: string; invoice_id: string; amount: number; method: string; status: string; received_at: string; created_at: string }
        Insert: { id?: string; organization_id: string; invoice_id: string; amount: number; method?: string; status?: string; received_at?: string }
        Update: Partial<Database['public']['Tables']['payments']['Insert']>
      }
      expenses: {
        Row: { id: string; organization_id: string; category: string; amount: number; note: string; date: string; created_at: string }
        Insert: { id?: string; organization_id: string; category: string; amount: number; note?: string; date?: string }
        Update: Partial<Database['public']['Tables']['expenses']['Insert']>
      }
      meetings: {
        Row: { id: string; organization_id: string; title: string; date: string; attendees: string[]; type: string; notes: string; created_at: string; updated_at: string }
        Insert: { id?: string; organization_id: string; title: string; date: string; attendees?: string[]; type?: string; notes?: string }
        Update: Partial<Database['public']['Tables']['meetings']['Insert']>
      }
      notifications: {
        Row: { id: string; user_id: string; title: string; message: string; read: boolean; created_at: string }
        Insert: { id?: string; user_id: string; title: string; message: string; read?: boolean }
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>
      }
      documents: {
        Row: { id: string; organization_id: string; name: string; category: string; brand_id: string | null; campaign_id: string | null; size: string; storage_path: string | null; uploaded_by: string; access_roles: string[]; created_at: string; updated_at: string }
        Insert: { id?: string; organization_id: string; name: string; category: string; brand_id?: string | null; campaign_id?: string | null; size?: string; storage_path?: string | null; uploaded_by: string; access_roles?: string[] }
        Update: Partial<Database['public']['Tables']['documents']['Insert']>
      }
      activity_logs: {
        Row: { id: string; organization_id: string; user_id: string; action: string; entity: string; entity_id: string; created_at: string }
        Insert: { id?: string; organization_id: string; user_id: string; action: string; entity: string; entity_id?: string }
        Update: Partial<Database['public']['Tables']['activity_logs']['Insert']>
      }
      ai_usage: {
        Row: { id: string; organization_id: string; user_id: string; provider: string; model: string; request_type: string; request_count: number; input_tokens: number; output_tokens: number; estimated_cost: number; created_at: string }
        Insert: {
          id?: string; organization_id: string; user_id: string; provider?: string; model?: string
          request_type: string; request_count?: number; input_tokens?: number
          output_tokens?: number; estimated_cost?: number
        }
        Update: Partial<Database['public']['Tables']['ai_usage']['Insert']>
      }
      team_assignments: {
        Row: { id: string; organization_id: string; user_id: string; entity: string; entity_id: string; role: string; created_at: string }
        Insert: { id?: string; organization_id: string; user_id: string; entity: string; entity_id: string; role?: string }
        Update: Partial<Database['public']['Tables']['team_assignments']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
