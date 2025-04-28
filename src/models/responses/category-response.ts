import { CategoryModel } from "../category-model";

export interface CategoryResponse {
  valid: boolean;
  data: CategoryModel[];
}
  