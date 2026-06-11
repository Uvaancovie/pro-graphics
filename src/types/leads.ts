// types/leads.ts

export interface LeadFormData {
  email: string
  firstName: string
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export interface CaptureLeadResponse {
  success: boolean
  message: string
  alreadySubscribed?: boolean
}

export type PopupPhase = 'hook' | 'form' | 'success' | 'closed'
