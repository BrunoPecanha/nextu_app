export interface CustomerInQueueReducedModel {
  id?: number;
  position: number;
  serviceQtd: number;
  payment: string;
  paymentIcon: string;
  timeToWait: string;
  logoPath: string;
  queueId: number;
}