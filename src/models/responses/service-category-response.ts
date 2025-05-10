import { ServiceCategoryModel } from "../service-category-model";

export interface ServiceCategoryResponse {
  valid: boolean;
  data: ServiceCategoryModel[];
  message: string;
}
  