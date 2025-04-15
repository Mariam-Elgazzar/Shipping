import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { DeliveryServiceModel } from '../models/DeliveryServiceModel';
interface Delivery {
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
export class DeliveryService {
  private mockDeliverys: Delivery[] = [
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
  private apiUrl = '/api/deliveries';

  constructor(private http: HttpClient) {}

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl);
  }

  getDeliveryById(userId: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/${userId}`);
  }

  createDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(this.apiUrl, delivery);
  }

  // updateDelivery(userId: string, delivery: Delivery): Observable<Delivery> {
  //   return this.http.put<Delivery>(`${this.apiUrl}/${userId}`, delivery);
  // }

  // delivery.service.ts
  updateDelivery(id: string, delivery: DeliveryServiceModel): Observable<DeliveryServiceModel> {
    return this.http.put<DeliveryServiceModel>(`${this.apiUrl}/${id}`, delivery);
  }

  // deleteDelivery(userId: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  // }
  getDeliverys(): Observable<any[]> {
    return of(this.mockDeliverys).pipe(delay(500));
  }

  getDeliveryDetails(DeliveryId: string): Observable<any> {
    const Delivery = this.mockDeliverys.find((o) => o.id === DeliveryId);
    return of(Delivery).pipe(delay(300));
  }

  deleteDelivery(DeliveryId: string): Observable<boolean> {
    // In a real app, this would make an API call
    return of(true).pipe(delay(300));
  }
}
