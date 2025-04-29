import { To } from "./to";

export interface UserModel extends To {  
  name: string;
  lastName: string;
  phone: string;
  address: string;
  number: string;
  city: string;
  stateId: string;
  cpf: string | null;
  status: number;
  email: string;
  password?: string;
  storeId: number | null;
  profile: number | null;
  stores: any[];
}