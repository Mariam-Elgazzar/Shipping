import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Merchant } from '../models/merchant.model';
// import { environment } from '../../environments/environment';
interface merchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchLocation: string;
  branchName: string;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private mockMerchants: merchant[] = [
    {
      id: '1',
      name: 'string',
      email: 'defgd@dghjffkmj',
      phone: 'string',
      branchLocation: 'string',
      branchName: 'string',
      status: 'true',
    },
    {
      id: '2',
      name: '2string',
      email: '2defgd@dghjffkmj',
      phone: '2string',
      branchLocation: '2string',
      branchName: '2string',
      status: 'false',
    },
    {
      id: '3',
      name: 'string',
      email: 'defgd@dghjffkmj',
      phone: 'string',
      branchLocation: 'string',
      branchName: 'string',
      status: 'true',
    },
  ];
  private apiUrl = '/api/merchants';
  constructor(private http: HttpClient) {}

  // getMerchants(): Observable<Merchant[]> {
  //   return this.http.get<Merchant[]>(this.apiUrl);
  // }

  // getMerchantById(userId: string): Observable<Merchant> {
  //   return this.http.get<Merchant>(`${this.apiUrl}/${userId}`);
  // }

  createMerchant(merchant: Merchant): Observable<Merchant> {
    return this.http.post<Merchant>(this.apiUrl, merchant);
  }

  updateMerchant(userId: string, merchant: Merchant): Observable<Merchant> {
    return this.http.put<Merchant>(`${this.apiUrl}/${userId}`, merchant);
  }

  // deleteMerchant(userId: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  // }

  getMerchants(): Observable<any[]> {
    return of(this.mockMerchants).pipe(delay(500));
  }

  getMerchantDetails(MerchantId: string): Observable<any> {
    const Merchant = this.mockMerchants.find((o) => o.id === MerchantId);
    return of(Merchant).pipe(delay(300));
  }

  deleteMerchant(MerchantId: string): Observable<boolean> {
    // In a real app, this would make an API call
    return of(true).pipe(delay(300));
  }
}
