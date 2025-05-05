export interface CustomerInQueueCardModel {
  id?: number;
  position: number;
  serviceQtd: number;
  storeIcon: string;
  payment: string;
  paymentIcon: string;
  logoPath: string;
  queueId: number;
}