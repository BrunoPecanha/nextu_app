import { StoreModel } from "./store-model";
import { To } from "./to";

export interface UserModel extends To {
  cpf: string;
  name: string;
  lastName: string;
  ddd: string;
  phone: string;
  address: string;
  number: string;
  city: string;
  stateId: string;
  status: number;
  email: string;
  subtitle: string;
  servicesProvided: string;
  profileImage: File;
  imageUrl?: string;
  acceptAwaysMinorQueue: boolean;
  profile: number;
  password?: string;
  storeId: number | null;
  stores: StoreModel[];
}