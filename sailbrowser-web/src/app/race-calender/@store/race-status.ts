export const RACE_STATUSES = [
  'Future',  
  'In progress',  // Race has been started
  'Canceled',
  'Postponed',
  'Completed',
  'Published',  // Results have been published. 
  'Closed',     // Results have been verified.
] as const;

export type RaceStatus = typeof RACE_STATUSES[number];