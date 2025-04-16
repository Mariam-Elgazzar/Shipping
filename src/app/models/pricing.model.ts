export interface Pricing {
  id: number;
  standardWeight: number;
  villagePrice: number;
  kGprice: number;
  isDeleted: boolean;
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
