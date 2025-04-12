import type { User } from "./user.model"

export interface Merchant {
    userId: string
    name: string
    email: string
    password?: string // Optional when updating
    branch: string
    phoneNumber: string
    address: string
    government: string
    city: string
    cost_Rejection: number
    bickup: number
    user?: User
}
