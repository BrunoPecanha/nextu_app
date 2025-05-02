import { CustomerInQueueModel } from "../customer-in-queue-model";

export interface CustomerInQueueResponse {
  valid: boolean;
  data: CustomerInQueueModel[];
  message: string;
}
  