export type Priority = 'Critical' | 'Important' | 'Emerging' | 'Moderate' | 'Undefined' | 'No Priority';

export interface Task {
  id: string;
  date: string;
  task: string;
  priority: Priority;
  startTime: string;
  endTime: string;
  durationHours: number;
  researchTime: string;
  roadblockTime: string;
  tools: string;
  resources: string;
  people: string;
  researchSources: string;
  roadblocks: string;
  researchCompleted: string;
  researchNeeded: string;
  accomplishments: string;
  errorRecognitionEvents: string;
  additionalTasks: string;
  expenses: string[];
}
