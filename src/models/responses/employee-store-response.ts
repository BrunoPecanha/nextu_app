import { EmployeeStoreModel } from "../employee-store-model";

export interface EmployeeStoreResponse {
  valid: boolean;
  data: EmployeeStoreModel;
  message: string;
}
  