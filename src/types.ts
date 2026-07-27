export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  institution?: string | null;
  message: string;
  created_at: string;
}

export type ContactInput = Omit<ContactSubmission, 'id' | 'created_at'>;

export interface DeviceData {
  id: string;
  name: string;
  icon: string;
  battery: number;
  status: 'charging' | 'discharging' | 'idle';
  priority: 'critical' | 'high' | 'medium' | 'low';
  health: number;
  consumption: number;
  x: number;
  y: number;
}

export interface Decision {
  source: string;
  receiver: string;
  transferWatts: number;
  estimatedMinutes: number;
  confidence: number;
  reasoning: string;
  timestamp: number;
}
