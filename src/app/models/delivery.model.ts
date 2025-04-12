import { User } from './user.model';

export enum SaleTypeEnum {
  Percentage = 'Percentage',
  FixedAmount = 'FixedAmount',
  Commission = 'Commission',
}

export interface Delivery {
  userId: string;
  name?: string; // Optional field for name
  email?: string; // Optional field for email
  password?: string; // Optional field for password
  branch?: string; // Optional field for branch
  government?: string; // Optional field for government
  city?: string; // Optional field for city
  phone?: string; // Optional field for phone
  address?: string; // Optional field for address
  saleType: SaleTypeEnum; // Sale type (Percentage, FixedAmount, Commission)
  salePresentage: number; // Sale percentage

  empId: string; // Employee ID associated with delivery

  // Navigation properties (optional)
  user?: User;
  employee?: User;
}
