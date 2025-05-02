export interface CustomerInQueueComplementModel {
  id?: number;
  position: number;
  serviceQtd: number;
  payment: string;
  paymentIcon: string;
  timeToWait: string;
  logoPath: string;
  queueId: number;
}