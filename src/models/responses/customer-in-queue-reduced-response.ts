import { CustomerInQueueReducedModel } from "../customer-in-queue-reduced-model";

export interface StoreResponse {
  valid: boolean;
  data: CustomerInQueueReducedModel;
  message: string;
}
  