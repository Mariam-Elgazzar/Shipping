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
  private permissionsKey = 'user_permissions';
  private userIdKey = 'user_id';

  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem(this.tokenKey);
    const userData = localStorage.getItem(this.userKey);
    const permissionsData = localStorage.getItem(this.permissionsKey);
    const idData = localStorage.getItem(this.userIdKey);

    // ✅ لو التوكن مش موجود أو منتهي: نلوج أوت
    if (!token || this.isTokenExpired(token)) {
      this.logout();
      return;
    }

    // ✅ لو باقي البيانات موجودة
    if (userData && idData) {
      try {
        const role = JSON.parse(userData).role;
        const id = JSON.parse(idData);
        const permissions = permissionsData ? JSON.parse(permissionsData) : {};
        const user: LoginResponse = {
          id,
          message: '',
          token,
          role,
          permissions,
        };
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Error parsing user data from localStorage', e);
        this.logout(); // 🧹 امسح أي بيانات بايظة
      }
    } else {
      this.logout();
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      if (!exp) return true;
      const now = Math.floor(new Date().getTime() / 1000);
      return now > exp;
    } catch (e) {
      console.error('Invalid token format', e);
      return true;
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
            this.permissionsKey,
            JSON.stringify(response.permissions)
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
    localStorage.removeItem(this.permissionsKey);
    localStorage.removeItem(this.userIdKey);
    this.currentUserSubject.next(null);
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
    if (!user || !user.permissions) return false;

    // permissionCode format: "Permission.Module.Action" (e.g., "Permission.Branchs.Create")
    const [, module, action] = permissionCode.split('.');
    return user.permissions[module]?.includes(action) || false;
  }

  hasRole(roleName: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === roleName || false;
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
