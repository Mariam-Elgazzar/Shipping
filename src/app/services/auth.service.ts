import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/Account';
  private tokenKey = 'auth_token';
  private userKey = 'user_data';
  private userPermission = 'user_data_permission';
  private userIdKey = 'user_data_id';

  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userData = localStorage.getItem(this.userKey);
    const permissionData = localStorage.getItem(this.userPermission);
    const idData = localStorage.getItem(this.userIdKey);

    if (userData && idData) {
      try {
        const role = JSON.parse(userData);
        const id = JSON.parse(idData);
        const permission = permissionData ? JSON.parse(permissionData) : null;
        const user: LoginResponse = {
          id,
          message: '',
          token: localStorage.getItem(this.tokenKey) || '',
          role,
          permission: permission
            ? { name: permission.name, values: permission.values || [] }
            : null,
        };
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Error parsing user data from localStorage', e);
        this.logout();
      }
    }
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/Login`, loginRequest)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response.role));
          localStorage.setItem(
            this.userPermission,
            JSON.stringify(response.permission || null)
          );
          localStorage.setItem(this.userIdKey, JSON.stringify(response.id));
          this.currentUserSubject.next(response);
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.userPermission);
    localStorage.removeItem(this.userIdKey);
    this.currentUserSubject.next(null);
  }

  refreshToken(): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/refresh-token`, {})
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
        }),
        catchError(this.handleError)
      );
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  hasPermission(permissionCode: string): boolean {
    const user = this.currentUserSubject.value;
    if (!user || !user.permission || !user.permission.values) return false;

    return user.permission.values.includes(permissionCode);
  }

  hasRole(roleName: string): boolean {
    const user = this.currentUserSubject.value;
    if (!user || !user.role) return false;

    return user.role === roleName;
  }

  forgotPassword(email: string): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/forgetpassword`,
      { email },
      { responseType: 'text' }
    );
  }

  resetPassword(
    email: string,
    token: string,
    password: string
  ): Observable<string> {
    const body = { email, token, password };
    return this.http
      .post(`${this.apiUrl}/resetPassword`, body, {
        responseType: 'text',
      })
      .pipe(
        tap((response) => console.log('Reset password response:', response)),
        catchError((error) => {
          console.error('Reset password error details:', error);
          return throwError(
            () =>
              new Error(
                'Failed to reset password: ' + (error.error || error.message)
              )
          );
        })
      );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<string> {
    // Retrieve userId from localStorage
    const userId = localStorage.getItem(this.userIdKey);

    // Check if userId exists
    if (!userId) {
      return throwError(() => new Error('User ID not found in local storage'));
    }

    // Parse userId since it’s stored as JSON string
    let parsedUserId: string;
    try {
      parsedUserId = JSON.parse(userId);
    } catch (e) {
      return throwError(
        () => new Error('Invalid user ID format in local storage')
      );
    }

    // Use oldPassword and newPassword as per backend expectation
    const payload = { oldPassword, newPassword, userId: parsedUserId };

    return this.http
      .post<string>(`${this.apiUrl}/ChangePassword`, payload, {
        responseType: 'text' as 'json',
      })
      .pipe(
        tap(() => console.log('Password changed successfully')),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.status === 401) {
      errorMessage = 'Invalid credentials';
    } else if (error.status === 403) {
      errorMessage = 'Access denied';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Server error: ${error.status}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
