export interface UserModel {
  id: number;
  name: string;
  lastname: string;
  registeringdate: string;
  lastupdate: string | null;
  phone: string;
  street: string;
  number: string;
  cpf: string;
  city: string;
  state: string;
  email: string;
  password?: string;
  active: boolean;
  profile: string | null;
  isvalid: boolean;
}