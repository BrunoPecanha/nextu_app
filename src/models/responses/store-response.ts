import { StoreModel } from "../store-model";

export interface StoreResponse {
  valid: boolean;
  data: StoreModel[];
  message: string;
}
  