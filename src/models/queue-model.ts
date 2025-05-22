import { StatusQueueEnum } from "./enums/status-queue.enum";

export interface QueueModel {
    id: string;                 
    storeId: string;  
    name: string;
    description: string;
    registeringDate?: Date;
    lastUpDate?: Date;
    status: StatusQueueEnum;
    timeGotInQueue: string;
    employeeId: string;
    services: string[];
    date: Date;
    currentCount: number;
    responsibleId: string;
    responsibleName: string;
}
