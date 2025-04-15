export interface Pricing {
  id: number;
  standardWeight: number;
  villagePrice: number;
  kGprice: number;
  isDeleted: boolean;
}

export interface PaginatedPricingResponse {
  data: Pricing[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface PricingResponse {
  id: number;
  standardWeight: number;
  villagePrice: number;
  kGprice: number;
  isDeleted: boolean;
}

export interface CreatePricingResponse {
  id: number;
}

export interface PricingRequest {
  standardWeight: number;
  villagePrice: number;
  kGprice: number;
}