export interface OrderItemModel {
  serviceId: number;
  queueId: number;
  name: string;
  icon: string;
  price: number;
  finalDuration: number;
  finalPrice: number;
  quantity: number;
  variablePrice: boolean;
  variableTime: boolean;
}
