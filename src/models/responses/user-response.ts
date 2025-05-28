import { UserModel } from "../user-model";

export interface UserResponse {
  valid: boolean;
  data: UserModel;
  message: string;
}
  