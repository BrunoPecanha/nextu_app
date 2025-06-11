import { StatusQueueEnum } from "./enums/status-queue.enum";

export interface QueueReducedModel {
    id: number;
    name: string;
    queueId: number;
    date: Date;
    status: StatusQueueEnum;
    currentCount: number;
    totalCount: number;
    responsibleId: number;
    responsibleName: string;
    queueDescription: string;
}
