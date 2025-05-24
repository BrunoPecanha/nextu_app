import { ProfessionalModel } from "../professional-model";

export interface ProfessionalResponse {
  valid: boolean;
  data: ProfessionalModel;
  message: string;
}
  