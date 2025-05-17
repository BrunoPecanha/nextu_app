import { PaymentModel } from "./payment-model";
import { ServiceModel } from "./service-model";

export interface CustomerInQueueCardDetailModel {
  id?: number;
  services: ServiceModel[];
  total: number;
  totalPeopleInQueue: number;
  payment: PaymentModel;
  position: number;
  timeToWait: number;
  queueId: number;
  attendantsName: string;
  token: string;
  timeCalledInQueue: string;
  estimatedWaitingTime: string;
}