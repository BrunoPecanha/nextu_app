export interface CustomerInQueueCardModel {
  id: number;
  position: number;
  serviceQtd: number;
  storeIcon: string;
  payment: string;
  paymentIcon: string;
  timeToWait: number;
  logoPath: string;
  queueId: number;
}