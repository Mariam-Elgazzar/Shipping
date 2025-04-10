import { Injectable } from "@angular/core"
import   { HttpClient } from "@angular/common/http"
import {   Observable, of } from "rxjs"
import   { Role, Permission } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class RoleService {
  private apiUrl = "/api/roles"

  // Mock data for demo purposes
  private mockRoles: Role[] = [
    {
      id: "1",
      name: "Administrator",
      description: "Full system access",
      permissions: [
        { id: "1", name: "View Dashboard", code: "dashboard:view", module: "dashboard" },
        { id: "2", name: "Manage Shipments", code: "shipments:manage", module: "shipments" },
        { id: "3", name: "Manage Users", code: "users:manage", module: "users" },
        { id: "4", name: "Manage Roles", code: "roles:manage", module: "roles" },
        { id: "5", name: "View Analytics", code: "analytics:view", module: "analytics" },
        { id: "6", name: "Manage Inventory", code: "inventory:manage", module: "inventory" },
        { id: "7", name: "Manage Couriers", code: "couriers:manage", module: "couriers" },
        { id: "8", name: "Manage Trucks", code: "trucks:manage", module: "trucks" },
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
        { id: "5", name: "View Analytics", code: "analytics:view", module: "analytics" },
        { id: "6", name: "Manage Inventory", code: "inventory:manage", module: "inventory" },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Viewer",
      description: "Read-only access",
      permissions: [
        { id: "1", name: "View Dashboard", code: "dashboard:view", module: "dashboard" },
        { id: "9", name: "View Shipments", code: "shipments:view", module: "shipments" },
        { id: "10", name: "View Inventory", code: "inventory:view", module: "inventory" },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  private mockPermissions: Permission[] = [
    { id: "1", name: "View Dashboard", code: "dashboard:view", module: "dashboard" },
    { id: "2", name: "Manage Shipments", code: "shipments:manage", module: "shipments" },
    { id: "3", name: "Manage Users", code: "users:manage", module: "users" },
    { id: "4", name: "Manage Roles", code: "roles:manage", module: "roles" },
    { id: "5", name: "View Analytics", code: "analytics:view", module: "analytics" },
    { id: "6", name: "Manage Inventory", code: "inventory:manage", module: "inventory" },
    { id: "7", name: "Manage Couriers", code: "couriers:manage", module: "couriers" },
    { id: "8", name: "Manage Trucks", code: "trucks:manage", module: "trucks" },
    { id: "9", name: "View Shipments", code: "shipments:view", module: "shipments" },
    { id: "10", name: "View Inventory", code: "inventory:view", module: "inventory" },
    { id: "11", name: "View Couriers", code: "couriers:view", module: "couriers" },
    { id: "12", name: "View Trucks", code: "trucks:view", module: "trucks" },
  ]

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    // In a real app, this would be an HTTP request
    // return this.http.get<Role[]>(this.apiUrl)
    return of(this.mockRoles)
  }

  getRole(id: string): Observable<Role> {
    // In a real app, this would be an HTTP request
    // return this.http.get<Role>(`${this.apiUrl}/${id}`)
    const role = this.mockRoles.find((r) => r.id === id)
    return of(role as Role)
  }

  createRole(role: Omit<Role, "id" | "createdAt" | "updatedAt">): Observable<Role> {
    // In a real app, this would be an HTTP request
    // return this.http.post<Role>(this.apiUrl, role)
    const newRole: Role = {
      ...role,
      id: (this.mockRoles.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.mockRoles.push(newRole)
    return of(newRole)
  }

  updateRole(id: string, role: Partial<Role>): Observable<Role> {
    // In a real app, this would be an HTTP request
    // return this.http.put<Role>(`${this.apiUrl}/${id}`, role)
    const index = this.mockRoles.findIndex((r) => r.id === id)
    if (index !== -1) {
      this.mockRoles[index] = {
        ...this.mockRoles[index],
        ...role,
        updatedAt: new Date(),
      }
      return of(this.mockRoles[index])
    }
    throw new Error("Role not found")
  }

  deleteRole(id: string): Observable<void> {
    // In a real app, this would be an HTTP request
    // return this.http.delete<void>(`${this.apiUrl}/${id}`)
    const index = this.mockRoles.findIndex((r) => r.id === id)
    if (index !== -1) {
      this.mockRoles.splice(index, 1)
    }
    return of(undefined)
  }

  getAllPermissions(): Observable<Permission[]> {
    // In a real app, this would be an HTTP request
    // return this.http.get<Permission[]>(`${this.apiUrl}/permissions`)
    return of(this.mockPermissions)
  }

  getPermissionsByModule(): Observable<Record<string, Permission[]>> {
    return of(this.groupPermissionsByModule(this.mockPermissions))
  }

  private groupPermissionsByModule(permissions: Permission[]): Record<string, Permission[]> {
    return permissions.reduce(
      (acc, permission) => {
        if (!acc[permission.module]) {
          acc[permission.module] = []
        }
        acc[permission.module].push(permission)
        return acc
      },
      {} as Record<string, Permission[]>,
    )
  }
}
