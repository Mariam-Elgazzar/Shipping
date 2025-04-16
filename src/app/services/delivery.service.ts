// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { delay, Observable, of } from 'rxjs';
// import { DeliveryServiceModel } from '../models/DeliveryServiceModel';
// interface Delivery {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   branchLocation: string;
//   branchName: string;
//   status: string;
// }
// @Injectable({
//   providedIn: 'root',
// })
// export class DeliveryService {
//   private mockDeliverys: Delivery[] = [
//     {
//       id: '1',
//       name: 'string',
//       email: 'defgd@dghjffkmj',
//       phone: 'string',
//       branchLocation: 'string',
//       branchName: 'string',
//       status: 'true',
//     },
//     {
//       id: '2',
//       name: '2string',
//       email: '2defgd@dghjffkmj',
//       phone: '2string',
//       branchLocation: '2string',
//       branchName: '2string',
//       status: 'false',
//     },
//     {
//       id: '3',
//       name: 'string',
//       email: 'defgd@dghjffkmj',
//       phone: 'string',
//       branchLocation: 'string',
//       branchName: 'string',
//       status: 'true',
//     },
//   ];
//   private apiUrl = '/api/deliveries';

//   constructor(private http: HttpClient) {}

//   getDeliveries(): Observable<Delivery[]> {
//     return this.http.get<Delivery[]>(this.apiUrl);
//   }

//   getDeliveryById(userId: string): Observable<Delivery> {
//     return this.http.get<Delivery>(`${this.apiUrl}/${userId}`);
//   }

//   createDelivery(delivery: Delivery): Observable<Delivery> {
//     return this.http.post<Delivery>(this.apiUrl, delivery);
//   }

//   // updateDelivery(userId: string, delivery: Delivery): Observable<Delivery> {
//   //   return this.http.put<Delivery>(`${this.apiUrl}/${userId}`, delivery);
//   // }

//   // delivery.service.ts
//   updateDelivery(id: string, delivery: DeliveryServiceModel): Observable<DeliveryServiceModel> {
//     return this.http.put<DeliveryServiceModel>(`${this.apiUrl}/${id}`, delivery);
//   }

//   // deleteDelivery(userId: string): Observable<void> {
//   //   return this.http.delete<void>(`${this.apiUrl}/${userId}`);
//   // }
//   getDeliverys(): Observable<any[]> {
//     return of(this.mockDeliverys).pipe(delay(500));
//   }

//   getDeliveryDetails(DeliveryId: string): Observable<any> {
//     const Delivery = this.mockDeliverys.find((o) => o.id === DeliveryId);
//     return of(Delivery).pipe(delay(300));
//   }

//   deleteDelivery(DeliveryId: string): Observable<boolean> {
//     // In a real app, this would make an API call
//     return of(true).pipe(delay(300));
//   }
// }
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  PaginatedDeliveryResponse,
  CreateDeliveryResponse,
  City,
  DeliveryRequest,
  DeliveryResponse,
} from '../models/delivery.model';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private readonly apiUrl = `${environment.apiUrl}/ShippingRepresentatives`;

  constructor(private http: HttpClient) {}

  getAllDeliveryReps(
    pageIndex: number,
    pageSize: number
  ): Observable<PaginatedDeliveryResponse> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http
      .get<PaginatedDeliveryResponse>(`${this.apiUrl}/GetALL`, { params })
      .pipe(
        map((response) => ({
          ...response,
          pageIndex: response.pageIndex,
          pageSize: response.pageSize,
          totalCount: response.totalCount,
          data: response.data,
        })),
        catchError(this.handleError)
      );
  }

  getDeliveryRepById(id: string): Observable<DeliveryResponse> {
    return this.http
      .get<DeliveryResponse>(`${this.apiUrl}/GetById/${id}`)
      .pipe(catchError(this.handleError));
  }

  createDeliveryRep(
    request: DeliveryRequest
  ): Observable<CreateDeliveryResponse> {
    return this.http
      .post<CreateDeliveryResponse>(`${this.apiUrl}/Add`, request)
      .pipe(catchError(this.handleError));
  }

  updateDeliveryRep(
    request: DeliveryRequest
  ): Observable<CreateDeliveryResponse> {
    return this.http
      .put<CreateDeliveryResponse>(`${this.apiUrl}/Update`, request)
      .pipe(catchError(this.handleError));
  }

  deleteDeliveryRep(id: string): Observable<CreateDeliveryResponse> {
    return this.http
      .delete<CreateDeliveryResponse>(`${this.apiUrl}/Delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  getCities(): Observable<City[]> {
    return new Observable((observer) => {
      observer.next([
        { id: 1, name: 'Cairo' },
        { id: 2, name: 'Alexandria' },
        { id: 3, name: 'Giza' },
        { id: 4, name: 'ElGharbia' },
      ]);
      observer.complete();
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Unauthorized access. Please log in again.';
    } else if (error.status === 403) {
      errorMessage = 'Access denied.';
    } else if (error.status === 404) {
      errorMessage = 'Delivery representative not found.';
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
