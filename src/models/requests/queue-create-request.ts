export interface QueueCreateRequest {
  storeId: number;
  employeeId: number;
  description: string; 
  date: string;
  openingTime: string;
  closingTime: string;
  type: 'normal' | 'priority' | 'express';
  eligibleGroups?: string[];
  maxServiceTime?: number; 
  isRecurring: boolean;
  recurringDays?: number[];
  recurringEndDate?: string | null;
}
