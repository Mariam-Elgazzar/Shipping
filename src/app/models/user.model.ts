export interface User {
  id: string
  username: string
  email: string
  firstName?: string
  lastName?: string
  roles: Role[]
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
}

export interface Role {
  id: string
  name: string
  description?: string
  permissions: Permission[]
  createdAt: Date
  updatedAt: Date
}

export interface Permission {
  id: string
  name: string
  code: string
  description?: string
  module: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}
export interface User {
  id: string
  username: string
  email: string
  // Add other user properties as needed
}
