import { Injectable } from "@angular/core"
import   { HttpClient } from "@angular/common/http"
import {   Observable, of } from "rxjs"
import   { User, Role } from "../models/user.model"
// import { environment } from "../../environments/environment"

@Injectable({
  providedIn: "root",
})

export class UserService {
  private apiUrl = "/api/users"

  
  // Mock data for demo purposes
  private mockUsers: User[] = [
    {
      id: "1",
      username: "admin",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      roles: [
        {
          id: "1",
          name: "Administrator",
          description: "Full system access",
          permissions: [
            { id: "1", name: "View Dashboard", code: "dashboard:view", module: "dashboard" },
            { id: "2", name: "Manage Shipments", code: "shipments:manage", module: "shipments" },
            { id: "3", name: "Manage Users", code: "users:manage", module: "users" },
            { id: "4", name: "Manage Roles", code: "roles:manage", module: "roles" },
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
      id: "2",
      username: "manager",
      email: "manager@example.com",
      firstName: "Manager",
      lastName: "User",
      roles: [
        {
          id: "2",
          name: "Manager",
          description: "Shipping management access",
          permissions: [
            { id: "1", name: "View Dashboard", code: "dashboard:view", module: "dashboard" },
            { id: "2", name: "Manage Shipments", code: "shipments:manage", module: "shipments" },
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
      id: "3",
      username: "viewer",
      email: "viewer@example.com",
      firstName: "Viewer",
      lastName: "User",
      roles: [
        {
          id: "3",
          name: "Viewer",
          description: "Read-only access",
          permissions: [{ id: "1", name: "View Dashboard", code: "dashboard:view", module: "dashboard" }],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
    },
  ]

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // In a real app, this would be an HTTP request
    // return this.http.get<User[]>(this.apiUrl)
    return of(this.mockUsers)
  }

  getUser(id: string): Observable<User> {
    // In a real app, this would be an HTTP request
    // return this.http.get<User>(`${this.apiUrl}/${id}`)
    const user = this.mockUsers.find((u) => u.id === id)
    return of(user as User)
  }

  createUser(user: Omit<User, "id" | "createdAt">): Observable<User> {
    // In a real app, this would be an HTTP request
    // return this.http.post<User>(this.apiUrl, user)
    const newUser: User = {
      ...user,
      id: (this.mockUsers.length + 1).toString(),
      createdAt: new Date(),
    }
    this.mockUsers.push(newUser)
    return of(newUser)
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    // In a real app, this would be an HTTP request
    // return this.http.put<User>(`${this.apiUrl}/${id}`, user)
    const index = this.mockUsers.findIndex((u) => u.id === id)
    if (index !== -1) {
      this.mockUsers[index] = {
        ...this.mockUsers[index],
        ...user,
      }
      return of(this.mockUsers[index])
    }
    throw new Error("User not found")
  }

  deleteUser(id: string): Observable<void> {
    // In a real app, this would be an HTTP request
    // return this.http.delete<void>(`${this.apiUrl}/${id}`)
    const index = this.mockUsers.findIndex((u) => u.id === id)
    if (index !== -1) {
      this.mockUsers.splice(index, 1)
    }
    return of(undefined)
  }

  assignRolesToUser(userId: string, roleIds: string[]): Observable<User> {
    // In a real app, this would be an HTTP request
    // return this.http.post<User>(`${this.apiUrl}/${userId}/roles`, { roleIds })

    // For demo, we'll just update the user's roles
    const userIndex = this.mockUsers.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    // Get roles from role service (simplified for demo)
    const mockRoles: Role[] = [
      {
        id: "1",
        name: "Administrator",
        description: "Full system access",
        permissions: [
          { id: "1", name: "View Dashboard", code: "dashboard:view", module: "dashboard" },
          { id: "2", name: "Manage Shipments", code: "shipments:manage", module: "shipments" },
          { id: "3", name: "Manage Users", code: "users:manage", module: "users" },
          { id: "4", name: "Manage Roles", code: "roles:manage", module: "roles" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "Manager",
        description: "Shipping management access",
        permissions: [
          { id: "1", name: "View Dashboard", code: "dashboard:view", module: "dashboard" },
          { id: "2", name: "Manage Shipments", code: "shipments:manage", module: "shipments" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        name: "Viewer",
        description: "Read-only access",
        permissions: [{ id: "1", name: "View Dashboard", code: "dashboard:view", module: "dashboard" }],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const roles = mockRoles.filter((role) => roleIds.includes(role.id))
    this.mockUsers[userIndex].roles = roles

    return of(this.mockUsers[userIndex])
  }
  getEmployees(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/employees`)
  }
}
