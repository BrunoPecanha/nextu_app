import { CustomerInQueueComplementModel } from "../customer-in-queue-complement-model";

export interface StoreResponse {
  valid: boolean;
  data: CustomerInQueueComplementModel;
  message: string;
}
  