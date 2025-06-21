import { OrderModel } from "../order-model";

export interface OrderResponse {
  valid: boolean;
  data: OrderModel[];
  message: string;
}
  