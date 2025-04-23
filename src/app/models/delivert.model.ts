export interface DeliveryOrder {
  id: string;
  sequentialNumber: string;
  status: string;
  merchant: string;
  customer: string;
  phone: string;
  address: string;
  orderCost: number;
  shippingCost: number;
}

export interface PaginatedDeliveryOrderResponse {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  data: DeliveryOrder[];
}
