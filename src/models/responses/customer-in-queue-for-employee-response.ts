import { CustomerInQueueForEmployeeModel } from "../customer-in-queue-for-employee-model";

export interface CustomerInQueueForEmployeeResponse {
  valid: boolean;
  data: CustomerInQueueForEmployeeModel[];
  message: string;
}
  