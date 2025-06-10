import { AddQueueServiceRequest } from "./add-queue-service-request";

export interface AddCustomerToQueueRequest {
  selectedServices: AddQueueServiceRequest[];
  notes: string;
  paymentMethod: string;
  queueId: number;
  userId: number;
  looseCustomer: boolean;
}