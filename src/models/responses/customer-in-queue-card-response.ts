import { CustomerInQueueCardModel } from "../customer-in-queue-card-model";

export interface CustomerInQueueCardResponse {
  valid: boolean;
  data: CustomerInQueueCardModel[];
  message: string;
}
  