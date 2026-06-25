export type HazardType = 'flood' | 'landslide' | 'storm' | 'drought' | 'other';
export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'active' | 'monitoring' | 'resolved';
export type ReportSource = 'web' | 'sms' | 'whatsapp' | 'voice';

export interface Report {
  id: string;
  source: ReportSource;
  reporter_id: string;
  raw_text: string;
  location?: GeoLocation;
  media_urls?: string[];
  created_at: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  location: GeoLocation;
  status: IncidentStatus;
  report_count: number;
  created_at: string;
  updated_at: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: Severity;
  channel: 'sms' | 'whatsapp' | 'email' | 'push';
  incident_id?: string;
  created_at: string;
}

export interface AIAnalysis {
  id: string;
  report_id: string;
  hazard_type: HazardType;
  severity: Severity;
  confidence: number;
  summary: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
}