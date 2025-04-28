import { UserModel } from "../user-model";

export interface AuthResponse {
    valid: boolean;
    data: {
      token: string;
      user: UserModel;
    };
  }
  