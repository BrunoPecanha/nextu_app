export interface UserModel {
  id: number;
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
  registeringDate: string;
  lastUpdate: string | null;
}
