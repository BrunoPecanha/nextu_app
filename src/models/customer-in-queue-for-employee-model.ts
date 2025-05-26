export interface CustomerInQueueForEmployeeModel {
  id: number;
  payment: string;
  paymentIcon: string;
  name: string;
  services: string;
  queueId: number;
  timeGotInQueue: string;
  inService: boolean;
  timeCalledInQueue: Date;
  isPaused: boolean;
}