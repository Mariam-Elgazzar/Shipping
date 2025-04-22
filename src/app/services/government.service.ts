import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  PaginatedGovernmentResponse,
  Government,
  GovernmentRequest,
  UpdateGovernmentRequest,
} from '../models/government.interface';

@Injectable({
  providedIn: 'root',
})
export class GovernmentService {
  private readonly apiUrl = `${environment.apiUrl}/Governorates`;

  constructor(private http: HttpClient) {}

  getGovernments(
    pageIndex: number = 1,
    pageSize: number = 100,
    search?: string
  ): Observable<PaginatedGovernmentResponse> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());
    if (search) {
      params = params.set('Search', search);
    }

    return this.http.get<PaginatedGovernmentResponse>(`${this.apiUrl}/GetAll`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getGovernmentDetails(id: number): Observable<Government> {
    return this.http.get<Government>(`${this.apiUrl}/GetById/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createGovernment(governmentData: GovernmentRequest): Observable<Government> {
    return this.http.post<Government>(`${this.apiUrl}/Create`, governmentData).pipe(
      catchError(this.handleError)
    );
  }

  updateGovernment(governmentData: UpdateGovernmentRequest): Observable<Government> {
    return this.http.put<Government>(`${this.apiUrl}/Update/${governmentData.id}`, governmentData).pipe(
      catchError(this.handleError)
    );
  }

  deleteGovernment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.status === 404) {
      errorMessage = 'Government not found';
    } else if (error.status === 400) {
      errorMessage = error.error?.message || 'Invalid request';
    } else {
      errorMessage = error.message || 'Server error';
    }
    return throwError(() => new Error(errorMessage));
  }
}
