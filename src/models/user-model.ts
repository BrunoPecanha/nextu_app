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
  profile: number;
  password?: string;
  storeId: number | null;
  stores: any[];
}

export enum UserProfileEnum {
  customer = 0,
  employee = 1, 
  owner = 2,
  admin = 3 
}