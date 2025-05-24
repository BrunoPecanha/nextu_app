import { PaymentMethodEnum } from "./enums/payment-method";

export interface QueueReportItemModel {
    name: string;
    startTime: Date;
    queueDate: Date;
    endTime: Date;
    paymentMethod: PaymentMethodEnum;
    amount: number;
    totalTime: number;
}
