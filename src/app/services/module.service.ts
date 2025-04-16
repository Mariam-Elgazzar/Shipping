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
  PaginatedModuleResponse,
  ModuleResponse,
} from '../models/module.model';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  private readonly apiUrl = `${environment.apiUrl}/Medule`;

  constructor(private http: HttpClient) {}

  getAllModules(
    pageIndex: number,
    pageSize: number,
    search?: string,
    userId?: string,
    sort?: string
  ): Observable<PaginatedModuleResponse> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    if (search) {
      params = params.set('Search', search);
    }
    if (userId) {
      params = params.set('UserId', userId);
    }
    if (sort) {
      params = params.set('Sort', sort);
    }

    return this.http
      .get<PaginatedModuleResponse>(`${this.apiUrl}/GetAll`, { params })
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

  getModuleById(id: number): Observable<ModuleResponse> {
    const params = new HttpParams().set('id', id.toString());
    return this.http
      .get<ModuleResponse>(`${this.apiUrl}/GetById`, { params })
      .pipe(catchError(this.handleError));
  }

  // Save permissions for a role or user
  savePermissions(permissions: { [key: string]: string[] }): Observable<void> {
    // Adjust endpoint based on actual backend API
    return this.http
      .post<void>(`${this.apiUrl}/SavePermissions`, permissions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Unauthorized access. Please log in again.';
    } else if (error.status === 403) {
      errorMessage = 'Access denied.';
    } else if (error.status === 404) {
      errorMessage = 'Module not found.';
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
