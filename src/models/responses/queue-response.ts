import { QueueModel } from "../queue-model";

export interface QueueResponse {
  valid: boolean;
  data: QueueModel[];
  message: string;
}
  