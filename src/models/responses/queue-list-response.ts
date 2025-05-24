import { QueueModel } from "../queue-model";

export interface QueueListResponse {
  valid: boolean;
  data: QueueModel[];
  message: string;
}
  