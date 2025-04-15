export interface RejectionReason {
  id?: string
  reason: string
  createdAt?: Date
  updatedAt?: Date
}

export interface RejectionReasonResponse {
  success: boolean
  data: RejectionReason | RejectionReason[]
  message?: string
  errors?: any
}

export interface RejectionReasonListResponse {
  success: boolean
  data: {
    reasons: RejectionReason[]
    totalCount: number
    page: number
    limit: number
  }
  message?: string
}

export interface RejectionReasonFilter {
  search?: string
  page?: number
  limit?: number
  sortBy?: string
  sortDirection?: "asc" | "desc"
}
