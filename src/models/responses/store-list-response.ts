import { StoreModel } from "../store-model";

export interface StoreListResponse {
  valid: boolean;
  data: StoreModel[];
  message: string;
}
  