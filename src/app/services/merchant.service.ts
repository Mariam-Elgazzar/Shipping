import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Merchant } from '../models/merchant.model';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {

  private apiUrl = '/api/merchants';
  constructor(private http: HttpClient) {}

  getMerchants(): Observable<Merchant[]> {
    return this.http.get<Merchant[]>(this.apiUrl);
  }

  getMerchantById(userId: string): Observable<Merchant> {
    return this.http.get<Merchant>(`${this.apiUrl}/${userId}`);
  }

  createMerchant(merchant: Merchant): Observable<Merchant> {
    return this.http.post<Merchant>(this.apiUrl, merchant);
  }

  updateMerchant(userId: string, merchant: Merchant): Observable<Merchant> {
    return this.http.put<Merchant>(`${this.apiUrl}/${userId}`, merchant);
  }

  deleteMerchant(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
