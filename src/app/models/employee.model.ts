export interface Employee {
  id?: string
  name: string
  phone: string
  email: string
  password?: string // Optional when retrieving existing employees
  address: string
  branchId: string
  roleId: string
  isActive?: boolean
}

export interface Branch {
  id: string
  name: string
  address?: string
  isActive?: boolean
}
