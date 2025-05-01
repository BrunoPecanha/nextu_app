export interface OpeningHoursRequest {
  weekDay: string;
  start?: string | null; 
  end?: string | null;   
  activated: boolean;
}