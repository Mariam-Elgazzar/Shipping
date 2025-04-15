export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: Role[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}
// export interface User {
//   id: string;
//   username: string;
//   email: string;
//   firstName?: string;
//   lastName?: string;
//   roles: Role[];
//   isActive: boolean;
//   lastLogin?: Date;
//   createdAt: Date;
// }

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}
// // The permission that used in the page of get all permisions and add
// interface Permission {
//   id: number;
//   name: string;
//   dateAdded: string;
// }
// interface PermissionModule {
//   id: number;
//   name: string;
//   permissions: {
//     view: boolean;
//     edit: boolean;
//     delete: boolean;
//     add: boolean;
//   };
// }
export interface Permission {
  id: string;
  name: string;
  code: string;
  description?: string;
  module: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  message: string;
  token: string;
  role: string | null;
  permission: { name: string; values: string[] } | null;
}
// export interface User {
//   id: string
//   username: string
//   email: string
//   // Add other user properties as needed
// }
