import { StoreModel } from "./store-model";
import { To } from "./to";

export interface HighLightModel extends To {
  phrase: string;
  icon: string;
  storeId: number;
  store?: StoreModel; 
}