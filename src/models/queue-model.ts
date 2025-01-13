export interface QueueModel {
    id: string;                 
    storeId: string;  
    name: string;
    description: string;
    registeringDate?: Date;
    lastUpDate?: Date;
    status?: StatusQueueEnum;
    employeeId?: string;
    services: string[];
}

export enum StatusQueueEnum {
    Open = 'open',
    Closed = 'closed',
    Waiting = 'waiting',
    InService = 'in_service',
    OnHold = 'on_hold'
}