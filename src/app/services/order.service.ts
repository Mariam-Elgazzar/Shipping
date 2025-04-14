import { Injectable } from "@angular/core"
import { Observable, of, delay } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor() {}

  getOrders(): Observable<any[]> {
    return of([
      {
        id: "MHGJ3-0",
        category: "Electronic",                  
        origin: "2775 Ash Dr, San Jose, South Dakota 83475",
        destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
        arrivalDate: "5:00 pm",
        weight: "10 kg",
        lastLocation: "Warehouse A",
      },
      {
        id: "MHGJ3-2",
        category: "Fashion",
        origin: "2775 Ash Dr, San Jose, South Dakota 83475",
        destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
        arrivalDate: "5:00 pm",
        weight: "10 kg",
        lastLocation: "Warehouse A",
      },
      {
        id: "MHGJ3-0",
        category: "Food",
        origin: "2775 Ash Dr, San Jose, South Dakota 83475",
        destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
        arrivalDate: "5:00 pm",
        weight: "10 kg",
        lastLocation: "Warehouse A",
      },
    ]).pipe(delay(500))
  }

  getOrderDetails(orderId: string): Observable<any> {
    return of({
      id: orderId,
      category: "Electronic",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse A",
    }).pipe(delay(300))
  }

  deleteOrder(orderId: string): Observable<boolean> {
    return of(true).pipe(delay(300))
  }
}
