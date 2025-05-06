import { StoreProfessionalModel } from "../store-professional-model";

export interface StoreProfessionalsResponse {
  valid: boolean;
  data: StoreProfessionalModel;
  message: string;
}
  