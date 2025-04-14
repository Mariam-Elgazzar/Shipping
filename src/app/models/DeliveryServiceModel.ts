// src/app/models/delivery-service.model.ts
export interface DeliveryServiceModel {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    branchLocation: string;
    branchName: string;
    status: string; // 'true' or 'false'
  }