export interface Activity {
  id: string; // uuid
  name: string;
  love: boolean;
  skill: boolean;
  need: boolean;
  pay: boolean;
  createdAt: number;
}

export type PillarType = 'LOVE' | 'SKILL' | 'NEED' | 'PAY';

export interface IkigaiContextType {
  activities: Activity[];
  addActivity: (name: string, initialPillars: { love?: boolean; skill?: boolean; need?: boolean; pay?: boolean }) => Promise<void>;
  updateActivity: (id: string, updates: Partial<Activity>) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  clearAllData: () => Promise<void>;
}
