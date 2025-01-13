import { ServiceModel } from "src/models/service-model";

export interface CompanyCard {
    name: string;
    type: ServiceModel[];
    queue: string;
    img: string;
  }