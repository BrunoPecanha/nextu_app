import { StoreModel } from "../store-model";

export interface StoreDetailResponse {
  valid: boolean;
  data: StoreModel;
  message: string;
}
  