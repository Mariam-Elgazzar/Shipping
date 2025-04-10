export interface Shipment {
  id?: string
  trackingNumber: string
  origin: string
  destination: string
  status: string
  date: Date
  estimatedDelivery?: Date
  cost: number
  weight: number
  notes?: string
}
