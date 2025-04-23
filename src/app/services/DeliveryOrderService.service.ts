import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PaginatedDeliveryOrderResponse, DeliveryOrder } from '../models/delivert.model';

@Injectable({
  providedIn: 'root',
})
export class DeliveryOrderService {
  private readonly apiUrl = `${environment.apiUrl}/Orders`;

  constructor(private http: HttpClient) {}

  getAllDeliveryOrders(
    pageIndex: number,
    pageSize: number
  ): Observable<PaginatedDeliveryOrderResponse> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http
      .get<any>(`${this.apiUrl}/GetALL`, { params })
      .pipe(
        map((response) => ({
          pageSize: response.pageSize,
          pageIndex: response.pageIndex,
          totalCount: response.totalCount,
          data: response.data.map((item: any) => ({
            id: item.id.toString(),
            sequentialNumber: item.id.toString().padStart(8, '0'), // Generate sequential number
            status: item.orderState,
            merchant: item.merchantName,
            customer: item.customerName,
            phone: item.customerPhone1,
            address: item.villageAndStreet,
            orderCost: item.orderPrice,
            shippingCost: item.chargePrice,
          })),
        })),
        catchError(this.handleError)
      );
  }

  updateOrderStatus(id: string, status: string): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/UpdateStatus/${id}`, { orderState: status })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Unauthorized access. Please log in again.';
    } else if (error.status === 403) {
      errorMessage = 'Access denied.';
    } else if (error.status === 404) {
      errorMessage = 'Order not found.';
    } else if (error.status === 400) {
      errorMessage = error.error?.message || 'Invalid request.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Server error: ${error.status}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
