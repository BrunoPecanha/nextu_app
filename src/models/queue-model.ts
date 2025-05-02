import { StatusQueueEnum } from "./enums/status-queue.enum";

export interface QueueModel {
    id: string;                 
    storeId: string;  
    name: string;
    description: string;
    registeringDate?: Date;
    lastUpDate?: Date;
    status: StatusQueueEnum;
    employeeId: string;
    services: string[];
}
