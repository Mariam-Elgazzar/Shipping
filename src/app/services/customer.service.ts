import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = '/api/customers';

  // Mock data for demo purposes
  private mockCustomers: Customer[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      totalOrders: 5,
      totalSpent: 349.95,
      createdAt: new Date('2023-01-15'),
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '(555) 987-6543',
      address: '456 Oak Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
      totalOrders: 3,
      totalSpent: 157.85,
      createdAt: new Date('2023-02-20'),
    },
  ];

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    // In a real app, this would be an HTTP request
    // return this.http.get<Customer[]>(this.apiUrl);
    return of(this.mockCustomers);
  }

  getCustomer(id: string): Observable<Customer> {
    // In a real app, this would be an HTTP request
    // return this.http.get<Customer>(`${this.apiUrl}/${id}`);
    const customer = this.mockCustomers.find((c) => c.id === id);
    return of(customer as Customer);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    // In a real app, this would be an HTTP request
    // return this.http.post<Customer>(this.apiUrl, customer);
    const newCustomer = {
      ...customer,
      id: (this.mockCustomers.length + 1).toString(),
      createdAt: new Date(),
    };
    this.mockCustomers.push(newCustomer);
    return of(newCustomer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    // In a real app, this would be an HTTP request
    // return this.http.put<Customer>(`${this.apiUrl}/${customer.id}`, customer);
    const index = this.mockCustomers.findIndex((c) => c.id === customer.id);
    if (index !== -1) {
      this.mockCustomers[index] = customer;
    }
    return of(customer);
  }

  deleteCustomer(id: string): Observable<void> {
    // In a real app, this would be an HTTP request
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    const index = this.mockCustomers.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.mockCustomers.splice(index, 1);
    }
    return of(undefined);
  }
}
