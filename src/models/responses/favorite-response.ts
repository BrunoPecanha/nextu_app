import { FavoriteModel } from "../favorite-model";

export interface FavoriteResponse {
  valid: boolean;
  data: FavoriteModel;
  message: string;
}
  