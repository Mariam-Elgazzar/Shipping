// export interface Merchant {
//   userId: string;
//   name: string;
//   email: string;
//   password?: string; // Optional when updating
//   branch: string;
//   phoneNumber: string;
//   address: string;
//   government: string;
//   city: string;
//   cost_Rejection: number;
//   bickup: number;
// }
export interface SpecialPrice {
  cityId: number;
  specialPrice: number;
}

// // export interface Merchant {
// //   id?: string;
// //   name: string;
// //   email: string;
// //   phoneNumber: string;
// //   storeName: string;
// //   rejectedOrderPercentage: number;
// //   specialPickUp: number;
// //   cityIds: number[];
// //   specialPrices: SpecialPrice[];
// // }

// export interface PaginatedMerchantResponse {
//   pageSize: number;
//   pageIndex: number;
//   totalCount: number;
//   data: Merchant[];
// }
// export interface Merchant {
//   id: string;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   storeName: string;
//   rejectedOrderPercentage: number;
//   specialPickUp: number;
//   hiringDate: string;
//   merchantCities: any[]; // Replace with specific type if known
//   specialPrices: any[]; // Replace with specific type if known
// }

// export interface PaginatedMerchantResponse {
//   pageSize: number;
//   pageIndex: number;
//   totalCount: number;
//   data: Merchant[];
// }
// export interface Merchant {
//   id: string;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   storeName: string;
//   rejectedOrderPercentage: number;
//   specialPickUp: number;
//   hiringDate: string;
//   merchantCities: any[];
//   specialPrices: any[];
// }

// export interface PaginatedMerchantResponse {
//   data: Merchant[];
//   pageIndex: number;
//   pageSize: number;
//   totalCount: number;
// }

// export interface CreateMerchantRequest {
//   name: string;
//   email: string;
//   phoneNumber: string;
//   password: string;
//   storeName: string;
//   rejectedOrderPercentage: number;
//   specialPickUp: number;
//   cityIds: number[];
//   specialPrices: { cityId: number; specialPrice: number }[];
// }

// export interface CreateMerchantResponse {
//   message: string;
// }

// // Mock city interface (replace with real API if available)
// export interface City {
//   id: number;
//   name: string;
// }
export interface Merchant {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  storeName: string;
  rejectedOrderPercentage: number;
  specialPickUp: number;
  hiringDate: string;
  merchantCities: string[];
  specialPrices: { cityId: number; specialPrice: number }[];
}

export interface PaginatedMerchantResponse {
  data: Merchant[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface MerchantRequest {
  id?: string; // Included for update, optional for create
  name: string;
  email: string;
  phoneNumber: string;
  storeName: string;
  rejectedOrderPercentage: number;
  specialPickUp: number;
  cityIds: number[];
  specialPrices: { cityId: number; specialPrice: number }[];
}

export interface MerchantResponse {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  storeName: string;
  rejectedOrderPercentage: number;
  specialPickUp: number;
  hiringDate: string;
  merchantCities: string[];
  specialPrices: { cityId: number; specialPrice: number }[];
}

export interface CreateMerchantResponse {
  message: string;
}

export interface City {
  id: number;
  name: string;
}
