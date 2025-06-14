export interface ClientHistoryRecordModel {
  establishmentName: string;
  date: string;
  startTime: string;
  endTime: string;
  amount: number;
  paymentMethod: string;
  services: string;
  status: string
  statusReason?: string;
}
