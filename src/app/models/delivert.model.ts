export interface DeliveryOrder {
  id: string
  sequentialNumber: string
  status: string
  merchant: string
  customer: string
  phone: string
  address: string
  orderCost: number
  shippingCost: number
}
