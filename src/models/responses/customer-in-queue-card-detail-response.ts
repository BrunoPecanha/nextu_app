import { CustomerInQueueCardDetailModel } from "../customer-in-queue-card-detail-model";

export interface CustomerInQueueCardDetailResponse {
  valid: boolean;
  data: CustomerInQueueCardDetailModel;
  message: string;
}
  