import { OrderItemModel } from "./order-item.model";

export interface OrderModel {
  orderNumber: number;
  items: OrderItemModel[];
  name: string;
  total: number;
  paymentMethodId: string;
  paymentIcon: string;
  paymentMethod: string;
  notes: string;
  priority: number;
  status: number;
  processedAt: string | null;
  processedByName: string;
  rejectionReason: string | null;
}
