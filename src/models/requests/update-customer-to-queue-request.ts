import { AddQueueServiceRequest } from "./add-queue-service-request";

export interface UpdateCustomerToQueueRequest {
  selectedServices: AddQueueServiceRequest[];
  notes: string;
  paymentMethod: number;
  id: number;
}