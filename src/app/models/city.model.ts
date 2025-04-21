export interface City {
    id: number; // Made id required
    governementName: string;
    cityName: string;
    cost: number;
    pickupCost: number;
    status: string;
    driverName?: string;
    driverPhone?: string;
    licenseNumber?: string;
    lastLocation?: string;
    deliverySchedule?: string;
    deliveryStatus?: string;
    deliveryHistory?: DeliveryHistory[];
  }

  export interface DeliveryHistory {
    date: string;
    title: string;
    description: string;
    status: string;
  }

  export interface Governorate {
    id?: number;
    name: string;
  }
  export interface City {
    id: number;
    name: string;
    chargePrice: number;
    pickUpPrice: number;
    governorateId: number;
    governorateName: string;
    isDeleted: boolean;
  }
