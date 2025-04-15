// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { delay, Observable, of } from 'rxjs';
// import { Merchant } from '../models/merchant.model';
// // import { environment } from '../../environments/environment';
// interface merchant {
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
// export class MerchantService {
//   private mockMerchants: merchant[] = [
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
//   private apiUrl = '/api/merchants';
//   constructor(private http: HttpClient) {}

//   // getMerchants(): Observable<Merchant[]> {
//   //   return this.http.get<Merchant[]>(this.apiUrl);
//   // }

//   // getMerchantById(userId: string): Observable<Merchant> {
//   //   return this.http.get<Merchant>(`${this.apiUrl}/${userId}`);
//   // }

//   createMerchant(merchant: Merchant): Observable<Merchant> {
//     return this.http.post<Merchant>(this.apiUrl, merchant);
//   }

//   updateMerchant(userId: string, merchant: Merchant): Observable<Merchant> {
//     return this.http.put<Merchant>(`${this.apiUrl}/${userId}`, merchant);
//   }

//   // deleteMerchant(userId: string): Observable<void> {
//   //   return this.http.delete<void>(`${this.apiUrl}/${userId}`);
//   // }

//   getMerchants(): Observable<any[]> {
//     return of(this.mockMerchants).pipe(delay(500));
//   }

//   getMerchantDetails(MerchantId: string): Observable<any> {
//     const Merchant = this.mockMerchants.find((o) => o.id === MerchantId);
//     return of(Merchant).pipe(delay(300));
//   }

//   deleteMerchant(MerchantId: string): Observable<boolean> {
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
  PaginatedMerchantResponse,
  Merchant,
  // CreateMerchantRequest,
  CreateMerchantResponse,
  City,
  MerchantRequest,
  MerchantResponse,
} from '../models/merchant.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private apiUrl = environment.apiUrl + '/Merchants';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllMerchants(
    pageIndex: number,
    pageSize: number
  ): Observable<PaginatedMerchantResponse> {
    // if (!this.authService.isLoggedIn()) {
    //   return throwError(() => new Error('User is not authenticated'));
    // }

    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http
      .get<PaginatedMerchantResponse>(`${this.apiUrl}/GetALL`, { params })
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
  getMerchantById(id: string): Observable<MerchantResponse> {
    return this.http
      .get<MerchantResponse>(`${this.apiUrl}/GetById/${id}`)
      .pipe(catchError(this.handleError));
  }
  createMerchant(request: MerchantRequest): Observable<CreateMerchantResponse> {
    return this.http
      .post<CreateMerchantResponse>(`${this.apiUrl}/Add`, request)
      .pipe(catchError(this.handleError));
  }
  updateMerchant(request: MerchantRequest): Observable<MerchantResponse> {
    return this.http
      .put<MerchantResponse>(`${this.apiUrl}/Update`, request)
      .pipe(catchError(this.handleError));
  }

  getCities(): Observable<City[]> {
    return new Observable((observer) => {
      observer.next([
        { id: 1, name: 'Cairo' },
        { id: 2, name: 'Alexandria' },
        { id: 3, name: 'Giza' },
      ]);
      observer.complete();
    });
  }
  deleteMerchant(id: string): Observable<void> {
    // if (!this.authService.isLoggedIn()) {
    //   return throwError(() => new Error('User is not authenticated'));
    // }

    return this.http
      .delete<void>(`${this.apiUrl}/Delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Unauthorized access. Please log in again.';
    } else if (error.status === 403) {
      errorMessage = 'Access denied.';
    } else if (error.status === 404) {
      errorMessage = 'Merchant not found.';
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
