import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { City } from '../models/city.model';

export interface PaginatedResponse<T> {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  data: T[];
}

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private readonly apiUrl =
    environment.apiUrl || 'https://shippingmanagementsystem.runasp.net';

  constructor(private http: HttpClient) {}

  getCities(
    pageIndex = 1,
    pageSize = 100,
    search?: string,
    governorateId?: number,
    minChargePrice?: number,
    maxChargePrice?: number,
    minPickUpPrice?: number,
    maxPickUpPrice?: number,
    isDeleted?: boolean,
    sort?: string
  ): Observable<PaginatedResponse<City>> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    if (search) params = params.set('Search', search);
    if (governorateId !== undefined)
      params = params.set('GovernorateId', governorateId.toString());
    if (minChargePrice !== undefined)
      params = params.set('MinChargePrice', minChargePrice.toString());
    if (maxChargePrice !== undefined)
      params = params.set('MaxChargePrice', maxChargePrice.toString());
    if (minPickUpPrice !== undefined)
      params = params.set('MinPickUpPrice', minPickUpPrice.toString());
    if (maxPickUpPrice !== undefined)
      params = params.set('MaxPickUpPrice', maxPickUpPrice.toString());
    if (isDeleted !== undefined)
      params = params.set('IsDeleted', isDeleted.toString());
    if (sort) params = params.set('Sort', sort);

    return this.http
      .get<PaginatedResponse<City>>(`${this.apiUrl}/Cities/GetAll`, { params })
      .pipe(
        map((response) => {
          console.log('Cities response:', response);
          return {
            ...response,
            data: Array.isArray(response.data) ? response.data : [],
          };
        }),
        catchError(this.handleError)
      );
  }

  getCityDetails(id: number): Observable<City> {
    return this.http
      .get<City>(`${this.apiUrl}/Cities/GetCityById/${id}`)
      .pipe(catchError(this.handleError));
  }

  deleteCity(cityId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/Cities/${cityId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Unauthorized access. Please log in again.';
    } else if (error.status === 403) {
      errorMessage = 'Access denied.';
    } else if (error.status === 404) {
      errorMessage = 'Resource not found.';
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
