import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private mockOrders = [
    {
      id: '1',
      vehicleNumber: '37654-90AR',
      vehicleType: 'Trucks',
      driverName: 'Adam Ahru',
      vehicleStatus: 'Active',
      lastLocation: '35791 Ranchview Dr, Richardson, California 82089',
      deliverySchedule: '20 Oct, 2020',
      deliveryStatus: 'Complete',
      driverPhone: '+1 (555) 123-4567',
      licenseNumber: 'DL-987654321',
      deliveryHistory: [
        {
          date: '20 Oct, 2020 - 14:30',
          title: 'Delivery Completed',
          description: 'Package delivered to recipient',
          status: 'Complete',
        },
        {
          date: '20 Oct, 2020 - 10:15',
          title: 'Out for Delivery',
          description: 'Package is out for delivery',
          status: 'Active',
        },
        {
          date: '19 Oct, 2020 - 18:45',
          title: 'Arrived at Destination Hub',
          description: 'Package arrived at Richardson distribution center',
          status: 'Active',
        },
      ],
    },
    {
      id: '2',
      vehicleNumber: '37654-90AR',
      vehicleType: 'Motorcycles',
      driverName: 'Brooklyn Simmons',
      vehicleStatus: 'Defective',
      lastLocation: '6541 Elgin St, Celina, Delaware 10299',
      deliverySchedule: '19 Oct, 2020',
      deliveryStatus: 'Complete',
      driverPhone: '+1 (555) 987-6543',
      licenseNumber: 'DL-123456789',
    },
    {
      id: '3',
      vehicleNumber: '37654-90AR',
      vehicleType: 'Trucks',
      driverName: 'Ralph Edwards',
      vehicleStatus: 'Active',
      lastLocation: '2987 Ash Dr, San Jose, South Dakota 83475',
      deliverySchedule: '15 Oct, 2020',
      deliveryStatus: 'Complete',
      driverPhone: '+1 (555) 234-5678',
      licenseNumber: 'DL-456789123',
    },
    {
      id: '4',
      vehicleNumber: '37654-90AR',
      vehicleType: 'Motorcycles',
      driverName: 'Darrell Steward',
      vehicleStatus: 'Defective',
      lastLocation: '2972 Westheimer Rd, Santa Ana, Illinois 85486',
      deliverySchedule: '24 Oct, 2020',
      deliveryStatus: 'Complete',
      driverPhone: '+1 (555) 345-6789',
      licenseNumber: 'DL-567891234',
    },
    {
      id: '5',
      vehicleNumber: '37654-90AR',
      vehicleType: 'Trucks',
      driverName: 'Marvin McKinney',
      vehicleStatus: 'Delivery',
      lastLocation: '4321 Parker Rd, Allentown, New Mexico 31569',
      deliverySchedule: '6 Feb, 2020',
      deliveryStatus: 'Pending',
      driverPhone: '+1 (555) 456-7890',
      licenseNumber: 'DL-678912345',
    },
    {
      id: '6',
      vehicleNumber: '37654-90AR',
      vehicleType: 'Motorcycles',
      driverName: 'Ronald Richards',
      vehicleStatus: 'Defective',
      lastLocation: '2972 Westheimer Rd, Santa Ana, Illinois 85486',
      deliverySchedule: '22 Oct, 2020',
      deliveryStatus: 'Complete',
      driverPhone: '+1 (555) 567-8901',
      licenseNumber: 'DL-789123456',
    },
  ];

  constructor() {}

  getOrders(): Observable<any[]> {
    return of(this.mockOrders).pipe(delay(500));
  }

  getOrderDetails(orderId: string): Observable<any> {
    const order = this.mockOrders.find((o) => o.id === orderId);
    return of(order).pipe(delay(300));
  }

  deleteOrder(orderId: string): Observable<boolean> {
    // In a real app, this would make an API call
    return of(true).pipe(delay(300));
  }
}
