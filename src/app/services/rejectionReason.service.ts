// rejection-reason.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  PaginatedRejectionReasonResponse,
  CreateRejectionReasonResponse,
  RejectionReasonRequest,
  RejectionReasonResponse,
} from '../models/rejection-reason.model';

@Injectable({
  providedIn: 'root',
})
export class RejectionReasonService {
  private readonly apiUrl = `${environment.apiUrl}/RejectedReasons`;

  constructor(private http: HttpClient) {}


  getAllRejectionReasons(
    pageIndex: number,
    pageSize: number
  ): Observable<PaginatedRejectionReasonResponse> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http
      .get<PaginatedRejectionReasonResponse>(`${this.apiUrl}/GetAll`, { params })
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

  getRejectionReasonById(id: number): Observable<RejectionReasonResponse> {
    return this.http
      .get<RejectionReasonResponse>(`${this.apiUrl}/GetRejectedReasonById/${id}`)
      .pipe(catchError(this.handleError));
  }


  createRejectionReason(
    request: RejectionReasonRequest
  ): Observable<CreateRejectionReasonResponse> {
    return this.http
      .post<CreateRejectionReasonResponse>(`${this.apiUrl}/CreateRejectedReason`,  request ) // Map to { text: string }
      .pipe(catchError(this.handleError));
  }

  // updateRejectionReason(
  //   request: RejectionReasonRequest
  // ): Observable<RejectionReasonResponse> {
  //   const payload = {
  //     id: request.id,
  //     text: request.text,
  //   };
  //   console.log('PUT to:', `${this.apiUrl}/Update`, 'Body:', payload);
  //   return this.http
  //     .put<RejectionReasonResponse>(`${this.apiUrl}/Update`, payload)
  //     .pipe(
  //       tap((response) => console.log('Update API response:', response)),
  //       catchError(this.handleError)
  //     );
  // }
  // updateRejectionReason(request: RejectionReasonRequest): Observable<RejectionReasonResponse> {
  //   const url = `${this.apiUrl}/UpdateRejectedReason /${request.id}`;
  //   const body = { text: request.text };
  //   return this.http.put<RejectionReasonResponse>(url, body).pipe(
  //     tap((response) => console.log('Update API response:', response)),
  //     catchError(this.handleError)
  //   );
  // }
  updateRejectionReason(request: RejectionReasonRequest): Observable<any> {
    const url = `${this.apiUrl}/UpdateRejectedReason/${request.id}`; // ✅ بدون مسافة
    const payload = { text: request.text };

    return this.http.put(url, payload, { responseType: 'text' as 'json' }).pipe(
      tap((response) => console.log('Update API response:', response)),
      catchError(this.handleError)
    );
  }


  // deleteRejectionReason(id: number): Observable<void> {
  //   return this.http
  //     .delete<void>(`${this.apiUrl}/DeleteRejectedReason/${id}`)
  //     .pipe(catchError(this.handleError));
  // }
  // deleteRejectionReason(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/DeleteRejectedReason/${id}`);
  // }
  deleteRejectionReason(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/DeleteRejectedReason/${id}`, { responseType: 'text' });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Unauthorized access. Please log in again.';
    } else if (error.status === 403) {
      errorMessage = 'Access denied.';
    } else if (error.status === 404) {
      errorMessage = 'Rejection reason not found.';
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
