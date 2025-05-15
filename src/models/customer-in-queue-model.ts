export interface CustomerInQueueModel {
    id: number;
    name: string;
    services: string;
    timeGotInQueue: string;
    payment: string;
    icon: string;
    paymentIcon: string;
    inService: boolean;
}