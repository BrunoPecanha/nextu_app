import { ProfessionalModel } from "./professional-model";

export interface StoreProfessionalModel {
  storeLogoPath: string;
  name: string;
  subtitle: string;
  professionals: ProfessionalModel[]
  isVerified: boolean;
}