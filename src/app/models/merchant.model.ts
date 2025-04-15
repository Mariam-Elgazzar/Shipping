export interface Merchant {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  storeName: string;
  rejectedOrderPercentage: number;
  specialPickUp: number;
  hiringDate: string;
  merchantCities: number[];
  specialPrices: { cityId: number; specialPrice: number }[];
}

// export interface PaginatedMerchantResponse {
//   data: Merchant[];
//   pageIndex: number;
//   pageSize: number;
//   totalCount: number;
// }

// export interface MerchantRequest {
//   id?: string; // Included for update, optional for create
//   name: string;
//   email: string;
//   phoneNumber: string;
//   storeName: string;
//   rejectedOrderPercentage: number;
//   specialPickUp: number;
//   cityIds: number[];
//   specialPrices: { cityId: number; specialPrice: number }[];
// }

// export interface MerchantResponse {
//   id: string;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   storeName: string;
//   rejectedOrderPercentage: number;
//   specialPickUp: number;
//   hiringDate: string;
//   merchantCities: string[];
//   specialPrices: { cityId: number; specialPrice: number }[];
// }

// export interface CreateMerchantResponse {
//   message: string;
// }

// export interface City {
//   id: number;
//   name: string;
// }
export interface City {
  id: number;
  name: string;
}

export interface SpecialPrice {
  cityId: number;
  specialPrice: number;
}

export interface MerchantResponse {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  storeName: string;
  rejectedOrderPercentage: number;
  specialPickUp: number;
  merchantCities: number[];
  specialPrices: SpecialPrice[];
}

export interface MerchantRequest {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  storeName: string;
  rejectedOrderPercentage: number;
  specialPickUp: number;
  cityIds: number[];
  specialPrices: SpecialPrice[];
}

export interface CreateMerchantResponse {
  id: string;
}

export interface PaginatedMerchantResponse {
  data: MerchantResponse[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}
