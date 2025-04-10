import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Shipment } from '../models/shipment.model';

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  // In a real app, this would be an API URL
  private apiUrl = '/api/shipments';

  // Mock data for demo purposes
  private mockShipments: Shipment[] = [
    {
      id: '1',
      trackingNumber: 'TRK123456',
      origin: 'New York, NY',
      destination: 'Los Angeles, CA',
      status: 'In Transit',
      date: new Date('2023-04-15'),
      estimatedDelivery: new Date('2023-04-18'),
      cost: 45.99,
      weight: 2.5,
      notes: 'Handle with care',
    },
    {
      id: '2',
      trackingNumber: 'TRK789012',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      status: 'Delivered',
      date: new Date('2023-04-10'),
      estimatedDelivery: new Date('2023-04-13'),
      cost: 32.5,
      weight: 1.8,
      notes: '',
    },
    {
      id: '3',
      trackingNumber: 'TRK345678',
      origin: 'Seattle, WA',
      destination: 'Boston, MA',
      status: 'Delayed',
      date: new Date('2023-04-12'),
      estimatedDelivery: new Date('2023-04-16'),
      cost: 56.75,
      weight: 3.2,
      notes: 'Weather delay',
    },
  ];

  constructor(private http: HttpClient) {}

  getShipments(): Observable<Shipment[]> {
    // In a real app, this would be an HTTP request
    // return this.http.get<Shipment[]>(this.apiUrl);
    return of(this.mockShipments);
  }

  getRecentShipments(): Observable<Shipment[]> {
    // In a real app, this would filter by date
    return of(this.mockShipments);
  }

  getShipment(id: string): Observable<Shipment> {
    // In a real app, this would be an HTTP request
    // return this.http.get<Shipment>(`${this.apiUrl}/${id}`);
    const shipment = this.mockShipments.find((s) => s.id === id);
    return of(shipment as Shipment);
  }

  createShipment(shipment: Shipment): Observable<Shipment> {
    // In a real app, this would be an HTTP request
    // return this.http.post<Shipment>(this.apiUrl, shipment);
    const newShipment = {
      ...shipment,
      id: (this.mockShipments.length + 1).toString(),
    };
    this.mockShipments.push(newShipment);
    return of(newShipment);
  }

  updateShipment(shipment: Shipment): Observable<Shipment> {
    // In a real app, this would be an HTTP request
    // return this.http.put<Shipment>(`${this.apiUrl}/${shipment.id}`, shipment);
    const index = this.mockShipments.findIndex((s) => s.id === shipment.id);
    if (index !== -1) {
      this.mockShipments[index] = shipment;
    }
    return of(shipment);
  }

  deleteShipment(id: string): Observable<void> {
    // In a real app, this would be an HTTP request
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    const index = this.mockShipments.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.mockShipments.splice(index, 1);
    }
    return of(undefined);
  }
}
