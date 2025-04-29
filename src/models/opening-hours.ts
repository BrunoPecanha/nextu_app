import { StoreModel } from "./store-model";
import { To } from "./to";

export interface OpeningHours extends To {
  weekDay: string;
  start?: string;
  end?: string;
  storeId: number;
  store?: StoreModel; 
}