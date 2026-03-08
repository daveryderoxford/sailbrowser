export const RACE_STATUSES = [
  'Future',  
  'In progress',  // Race has been started
  'Canceled',
  'Postponed',
  'Completed',
  'Published',  // Results have been published. 
  'Verified',   // Results have been verified.
  'Archived',   // Archived - no longer included 
] as const;

export type RaceStatus = typeof RACE_STATUSES[number];