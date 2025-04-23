export interface IGetAllEmployee {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  creationDate: string;
  branches: IBranch[];
  permission: string;
  isDeleted: boolean;
}

export interface IBranch {
  id: number;
  name: string;
  creationDate: string;
  isDeleted: boolean;
  location: string;
  cityName: string;
}

export interface IGetAllEmployeeResponse {
  data: IGetAllEmployee[];
  total: number;
}

export interface IBranchParams {
  pageSize: number;
  pageIndex: number;
  SearchByName?: string;
  Branch?: string;
  IsActive?: boolean;
  Sort?: string;
}

export interface IAddEmployee {
  name: string;
  email: string;
  phoneNumber: string;
  branchIds: number[];
  address: string;
  groupId: number;
  password: string;
}

export interface IUpdateEmployee {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  branches: number[];
  permission: string;
}

export interface IGroupPages {
  // Placeholder for group pages (adjust based on API response)
  id: string;
  name: string;
}
export interface IBranchParams {
  pageSize: number;
  pageIndex: number;
  SearchByName?: string;
  IsActive?: boolean;
  Branch?: string;
  Sort?: string;
}

export interface IBranch {
  id: number;
  name: string;
}

export interface IGetAllEmployee {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  creationDate: string;
  branches: IBranch[];
  permission: string;
  isDeleted: boolean;
}

export interface IUpdateEmployee {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  // branches: string[];
  permission: string;
  isDeleted: boolean;
}

// New interface for EmployeeDetails
export interface IDeliveryHistory {
  date: string;
  title: string;
  description: string;
  status: string; // e.g., "completed", "pending", "failed"
}

export interface IEmployeeDetails {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  branches: any[]; // Adjust based on your API response
  creationDate: string;
  permission: string;
  isDeleted: boolean; // e.g., "active", "inactive"
  driverName: string;
  driverPhone?: string;
  licenseNumber?: string;
  lastLocation: string;
  deliverySchedule: string;
  deliveryStatus: string; // e.g., "on-time", "delayed", "completed"
  deliveryHistory?: IDeliveryHistory[];
}
