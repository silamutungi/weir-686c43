export interface Database {
  public: {
    Tables: {
      weir_profiles: { Row: WeirProfile; Insert: Partial<WeirProfile>; Update: Partial<WeirProfile> }
      weir_detections: { Row: WeirDetection; Insert: Partial<WeirDetection>; Update: Partial<WeirDetection> }
      weir_licenses: { Row: WeirLicense; Insert: Partial<WeirLicense>; Update: Partial<WeirLicense> }
      weir_earnings: { Row: WeirEarning; Insert: Partial<WeirEarning>; Update: Partial<WeirEarning> }
    }
  }
}

export interface WeirProfile {
  id: string
  user_id: string
  display_name: string
  bio: string | null
  creator_tier: 'starter' | 'growth' | 'pro'
  monitoring_keywords: string[]
  created_at: string
  deleted_at: string | null
}

export interface WeirDetection {
  id: string
  user_id: string
  platform: string
  url: string
  match_type: 'image' | 'video' | 'deepfake' | 'name'
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'approved' | 'takedown' | 'monetized' | 'ignored'
  detected_at: string
  created_at: string
  deleted_at: string | null
}

export interface WeirLicense {
  id: string
  user_id: string
  detection_id: string | null
  platform: string
  license_type: 'personal' | 'commercial' | 'editorial'
  price_usd: number
  status: 'draft' | 'sent' | 'accepted' | 'rejected'
  terms: string
  created_at: string
  deleted_at: string | null
}

export interface WeirEarning {
  id: string
  user_id: string
  license_id: string | null
  platform: string
  amount_usd: number
  cpm: number
  earned_at: string
  created_at: string
  deleted_at: string | null
}

export type DetectionStatus = WeirDetection['status']
export type RiskLevel = WeirDetection['risk_level']
