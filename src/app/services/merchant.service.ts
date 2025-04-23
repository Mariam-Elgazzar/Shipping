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
  CreateMerchantResponse,
  City,
  MerchantRequest,
  MerchantResponse,
} from '../models/merchant.model';
import { CreateMerchantRequest } from '../components/Merchants/add-merchant/merchant.component';
export interface UpdateMerchantRequest extends CreateMerchantRequest {}

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private readonly apiUrl = `${environment.apiUrl}/Merchants`;

  constructor(private http: HttpClient) {}

  getAllMerchants(
    pageIndex: number,
    pageSize: number
  ): Observable<PaginatedMerchantResponse> {
    const params = new HttpParams()
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

  // getMerchantById(id: string): Observable<MerchantResponse> {
  //   return this.http
  //     .get<MerchantResponse>(`${this.apiUrl}/GetById/${id}`)
  //     .pipe(catchError(this.handleError));
  // }

  // createMerchant(request: MerchantRequest): Observable<CreateMerchantResponse> {
  //   return this.http
  //     .post<CreateMerchantResponse>(`${this.apiUrl}/Add`, request)
  //     .pipe(catchError(this.handleError));
  // }

  // updateMerchant(request: MerchantRequest): Observable<MerchantResponse> {
  //   return this.http
  //     .put<MerchantResponse>(`${this.apiUrl}/Update`, request)
  //     .pipe(catchError(this.handleError));
  // }
  createMerchant(request: CreateMerchantRequest): Observable<MerchantResponse> {
    return this.http
      .post<MerchantResponse>(`${this.apiUrl}/Add`, request)
      .pipe(catchError(this.handleError));
  }

  updateMerchant(request: UpdateMerchantRequest): Observable<MerchantResponse> {
    return this.http
      .put<MerchantResponse>(`${this.apiUrl}/Update`, request)
      .pipe(catchError(this.handleError));
  }

  getMerchantById(id: string): Observable<any> {
    return this.http
      .get<MerchantResponse>(`${this.apiUrl}/GetById/${id}`)
      .pipe(catchError(this.handleError));
  }

  deleteMerchant(id: string): Observable<void> {
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
