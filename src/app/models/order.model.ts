export interface Order {
  id: string
  date: string
  customerName: string
  government: string
  city: string
  orderCost: string
  merchant: string
  category?: string
  origin?: string
  destination?: string
  arrivalDate?: string
  weight?: string
  lastLocation?: string
  customerPhone?: string
  customerEmail?: string
  shippingType?: string
  payWay?: string
  status?: string
  assignedMerchant?: string
  statusNotes?: string
}

// Update the FilterOptions interface to include government and city
export interface FilterOptions {
  categories: string[]
  governments: string[]
  cities: string[]
  merchants: string[]
  dateRange: {
    start: string | null
    end: string | null
  }
  locations: string[]
}
