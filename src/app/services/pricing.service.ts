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
  PricingResponse,
  CreatePricingResponse,
  PricingRequest,
} from '../models/pricing.model';

@Injectable({
  providedIn: 'root',
})
export class PricingService {
  private readonly apiUrl = `${environment.apiUrl}/standard`;

  constructor(private http: HttpClient) {}

  getAllPricings(): Observable<PricingResponse[]> {
    return this.http.get<PricingResponse[]>(`${this.apiUrl}/GetALL`).pipe(
      map((response) => ({
        ...response,
      })),
      catchError(this.handleError)
    );
  }

  getPricingById(id: number): Observable<PricingResponse> {
    return this.http
      .get<PricingResponse>(`${this.apiUrl}/GetById/${id}`)
      .pipe(catchError(this.handleError));
  }

  createPricing(request: PricingRequest): Observable<CreatePricingResponse> {
    return this.http
      .post<CreatePricingResponse>(`${this.apiUrl}/create`, request)
      .pipe(catchError(this.handleError));
  }

  updatePricing(
    request: PricingRequest & { id: number }
  ): Observable<PricingResponse> {
    return this.http
      .put<PricingResponse>(`${this.apiUrl}/Update`, request)
      .pipe(catchError(this.handleError));
  }

  deletePricing(id: number): Observable<void> {
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
      errorMessage = 'Pricing not found.';
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
