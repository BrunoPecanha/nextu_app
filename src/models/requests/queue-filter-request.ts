import { StatusQueueEnum } from "../enums/status-queue.enum";

export interface QueueFilterRequest {
  startDate: Date | null;
  endDate: Date | null;
  queueStatus?: StatusQueueEnum | null;
  responsibleId?: number | null;
}