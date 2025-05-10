import { ServiceModel } from "../service-model";

export interface ServiceResponse {
  valid: boolean;
  data: ServiceModel[];
  message: string;
}
  