import { StoreModel } from "./store-model";
import { To } from "./to";

export interface OpeningHoursModel extends To {
  weekDay: string;
  start?: string;
  end?: string;
  storeId: number;
  store?: StoreModel;
  activated: boolean;
}