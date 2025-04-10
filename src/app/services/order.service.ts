import { Injectable } from "@angular/core"
import   { HttpClient } from "@angular/common/http"
import {   Observable, of } from "rxjs"
import   { Order } from "../models/order.model"

@Injectable({
  providedIn: "root",
})
export class OrderService {
  // In a real app, this would be an API URL
  private apiUrl = "/api/orders"

  // Mock data for demo purposes
  private mockOrders: Order[] = [
    {
      id: "1",
      orderId: "ORD-2023-001",
      customerName: "John Smith",
      customerEmail: "john@example.com",
      items: [
        { id: "1", name: "Product A", quantity: 2, price: 19.99 },
        { id: "2", name: "Product B", quantity: 1, price: 29.99 },
      ],
      total: 69.97,
      date: new Date("2023-04-14"),
      status: "Processing",
      shippingAddress: "123 Main St, New York, NY 10001",
      billingAddress: "123 Main St, New York, NY 10001",
      paymentMethod: "Credit Card",
    },
    {
      id: "2",
      orderId: "ORD-2023-002",
      customerName: "Jane Doe",
      customerEmail: "jane@example.com",
      items: [{ id: "3", name: "Product C", quantity: 3, price: 15.99 }],
      total: 47.97,
      date: new Date("2023-04-15"),
      status: "Pending",
      shippingAddress: "456 Oak Ave, Chicago, IL 60601",
      billingAddress: "456 Oak Ave, Chicago, IL 60601",
      paymentMethod: "PayPal",
    },
  ]

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    // In a real app, this would be an HTTP request
    // return this.http.get<Order[]>(this.apiUrl);
    return of(this.mockOrders)
  }

  getPendingOrders(): Observable<Order[]> {
    // In a real app, this would filter by status
    return of(this.mockOrders.filter((o) => o.status === "Pending"))
  }

  getOrder(id: string): Observable<Order> {
    // In a real app, this would be an HTTP request
    // return this.http.get<Order>(`${this.apiUrl}/${id}`);
    const order = this.mockOrders.find((o) => o.id === id)
    return of(order as Order)
  }

  createOrder(order: Order): Observable<Order> {
    // In a real app, this would be an HTTP request
    // return this.http.post<Order>(this.apiUrl, order);
    const newOrder = {
      ...order,
      id: (this.mockOrders.length + 1).toString(),
    }
    this.mockOrders.push(newOrder)
    return of(newOrder)
  }

  updateOrder(order: Order): Observable<Order> {
    // In a real app, this would be an HTTP request
    // return this.http.put<Order>(`${this.apiUrl}/${order.id}`, order);
    const index = this.mockOrders.findIndex((o) => o.id === order.id)
    if (index !== -1) {
      this.mockOrders[index] = order
    }
    return of(order)
  }

  deleteOrder(id: string): Observable<void> {
    // In a real app, this would be an HTTP request
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    const index = this.mockOrders.findIndex((o) => o.id === id)
    if (index !== -1) {
      this.mockOrders.splice(index, 1)
    }
    return of(undefined)
  }
}
