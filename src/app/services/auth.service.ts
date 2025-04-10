import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User, LoginRequest, LoginResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/auth';
  private tokenKey = 'auth_token';
  private userKey = 'user_data';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Mock data for demo purposes
  private mockUsers: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      roles: [
        {
          id: '1',
          name: 'Administrator',
          description: 'Full system access',
          permissions: [
            {
              id: '1',
              name: 'View Dashboard',
              code: 'dashboard:view',
              module: 'dashboard',
            },
            {
              id: '2',
              name: 'Manage Shipments',
              code: 'shipments:manage',
              module: 'shipments',
            },
            {
              id: '3',
              name: 'Manage Users',
              code: 'users:manage',
              module: 'users',
            },
            {
              id: '4',
              name: 'Manage Roles',
              code: 'roles:manage',
              module: 'roles',
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
    },
    {
      id: '2',
      username: 'manager',
      email: 'manager@example.com',
      firstName: 'Manager',
      lastName: 'User',
      roles: [
        {
          id: '2',
          name: 'Manager',
          description: 'Shipping management access',
          permissions: [
            {
              id: '1',
              name: 'View Dashboard',
              code: 'dashboard:view',
              module: 'dashboard',
            },
            {
              id: '2',
              name: 'Manage Shipments',
              code: 'shipments:manage',
              module: 'shipments',
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
    },
    {
      id: '3',
      username: 'viewer',
      email: 'viewer@example.com',
      firstName: 'Viewer',
      lastName: 'User',
      roles: [
        {
          id: '3',
          name: 'Viewer',
          description: 'Read-only access',
          permissions: [
            {
              id: '1',
              name: 'View Dashboard',
              code: 'dashboard:view',
              module: 'dashboard',
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
    },
  ];

  constructor(private http: HttpClient) {
    // Load user from localStorage on service initialization
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userData = localStorage.getItem(this.userKey);
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Error parsing user data from localStorage', e);
        this.logout();
      }
    }
  }

  login(loginRequest: LoginRequest): Observable<User> {
    // In a real app, this would be an HTTP request
    // return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest)
    //   .pipe(
    //     tap(response => {
    //       localStorage.setItem(this.tokenKey, response.token)
    //       localStorage.setItem(this.userKey, JSON.stringify(response.user))
    //       this.currentUserSubject.next(response.user)
    //     }),
    //     map(response => response.user),
    //     catchError(error => {
    //       console.error('Login error', error)
    //       return throwError(() => new Error('Invalid username or password'))
    //     })
    //   )

    // Mock login for demo
    const user = this.mockUsers.find(
      (u) => u.username === loginRequest.username
    );

    if (user && loginRequest.password === 'password') {
      // Simple password check for demo
      const mockResponse: LoginResponse = {
        token: 'mock-jwt-token-' + user.id,
        user: user,
      };

      localStorage.setItem(this.tokenKey, mockResponse.token);
      localStorage.setItem(this.userKey, JSON.stringify(mockResponse.user));
      this.currentUserSubject.next(mockResponse.user);

      return of(mockResponse.user);
    } else {
      return throwError(() => new Error('Invalid username or password'));
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasPermission(permissionCode: string): boolean {
    const user = this.currentUserSubject.value;
    if (!user) return false;

    // Check if user has the permission through any of their roles
    return user.roles.some((role) =>
      role.permissions.some((permission) => permission.code === permissionCode)
    );
  }

  hasRole(roleName: string): boolean {
    const user = this.currentUserSubject.value;
    if (!user) return false;

    return user.roles.some((role) => role.name === roleName);
  }
}
