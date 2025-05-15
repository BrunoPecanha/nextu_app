import { CustomerModel } from "../customer-model";

export interface CustomerResponse {
  valid: boolean;
  data: CustomerModel;
  message: string;
}
  