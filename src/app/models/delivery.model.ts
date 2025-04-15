export interface PaginatedDeliveryResponse {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  data: DeliveryResponse[];
}

export interface DeliveryResponse {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  discountType: number;
  companyPercentage: number;
  hiringDate: string;
  governorates: string[];
}

export interface DeliveryRequest {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  password?: string;
  discountType: number;
  companyPercentage: number;
  governorateIds: number[];
}

export interface CreateDeliveryResponse {
  message: string;
}

export interface City {
  id: number;
  name: string;
}
