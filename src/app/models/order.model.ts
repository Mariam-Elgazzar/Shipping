export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  orderId: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  date: Date
  status: string
  shippingAddress: string
  billingAddress: string
  paymentMethod: string
}
