import { ProfessionalModel } from "./professional-model";

export interface StoreProfessionalModel {
  id: number;
  storeLogoPath: string;
  name: string;
  subtitle: string;
  professionals: ProfessionalModel[]
  isVerified: boolean;
}