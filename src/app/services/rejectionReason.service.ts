import { Injectable } from "@angular/core"
import { HttpClient, HttpParams, type HttpErrorResponse } from "@angular/common/http"
import { type Observable, of, throwError } from "rxjs"
import { catchError, retry, delay } from "rxjs/operators"
import type {
  RejectionReason,
  RejectionReasonResponse,
  RejectionReasonListResponse,
  RejectionReasonFilter,
} from "../models/rejection-reason.model"

// Environment configuration
const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api",
  useMockData: true, // Change to false when API is ready
}

@Injectable({
  providedIn: "root",
})
export class RejectionReasonService {
  private apiUrl = `${environment.apiUrl}/rejection-reasons`
  private useMockData = environment.useMockData

  // Mock data for testing
  private mockReasons: RejectionReason[] = [
    {
      id: "1",
      reason: "Customer requested cancellation",
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date("2023-01-15"),
    },
    {
      id: "2",
      reason: "Package damaged during transit",
      createdAt: new Date("2023-01-16"),
      updatedAt: new Date("2023-01-16"),
    },
    {
      id: "3",
      reason: "Incorrect address provided",
      createdAt: new Date("2023-01-17"),
      updatedAt: new Date("2023-01-17"),
    },
  ]

  constructor(private http: HttpClient) {
    console.log(`Rejection Reason Service initialized in ${this.useMockData ? "mock" : "API"} mode`)
  }

  /**
   * Get all rejection reasons with optional filtering
   */
  getReasons(filter?: RejectionReasonFilter): Observable<RejectionReasonListResponse> {
    if (this.useMockData) {
      return this.getMockReasons(filter)
    }

    let params = new HttpParams()

    if (filter) {
      if (filter.search) params = params.set("search", filter.search)
      if (filter.page) params = params.set("page", filter.page.toString())
      if (filter.limit) params = params.set("limit", filter.limit.toString())
      if (filter.sortBy) params = params.set("sortBy", filter.sortBy)
      if (filter.sortDirection) params = params.set("sortDirection", filter.sortDirection)
    }

    return this.http
      .get<RejectionReasonListResponse>(this.apiUrl, { params })
      .pipe(retry(1), catchError(this.handleError))
  }

  /**
   * Get a rejection reason by ID
   */
  getReasonById(id: string): Observable<RejectionReasonResponse> {
    if (this.useMockData) {
      return this.getMockReasonById(id)
    }

    return this.http.get<RejectionReasonResponse>(`${this.apiUrl}/${id}`).pipe(retry(1), catchError(this.handleError))
  }

  /**
   * Create a new rejection reason
   */
  createReason(reason: RejectionReason): Observable<RejectionReasonResponse> {
    if (this.useMockData) {
      return this.createMockReason(reason)
    }

    return this.http.post<RejectionReasonResponse>(this.apiUrl, reason).pipe(catchError(this.handleError))
  }

  /**
   * Update an existing rejection reason
   */
  updateReason(id: string, reason: RejectionReason): Observable<RejectionReasonResponse> {
    if (this.useMockData) {
      return this.updateMockReason(id, reason)
    }

    return this.http.put<RejectionReasonResponse>(`${this.apiUrl}/${id}`, reason).pipe(catchError(this.handleError))
  }

  /**
   * Delete a rejection reason
   */
  deleteReason(id: string): Observable<RejectionReasonResponse> {
    if (this.useMockData) {
      return this.deleteMockReason(id)
    }

    return this.http.delete<RejectionReasonResponse>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError))
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = ""

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`

      // If the server returned a specific error message, use it
      if (error.error && error.error.message) {
        errorMessage = error.error.message
      }
    }

    console.error(errorMessage)
    return throwError(() => new Error(errorMessage))
  }

  // =============== Mock Data Methods =============== //

  /**
   * Get mock rejection reasons with filtering
   */
  private getMockReasons(filter?: RejectionReasonFilter): Observable<RejectionReasonListResponse> {
    let filteredReasons = [...this.mockReasons]

    if (filter) {
      if (filter.search) {
        const searchLower = filter.search.toLowerCase()
        filteredReasons = filteredReasons.filter((reason) => reason.reason.toLowerCase().includes(searchLower))
      }

      // Sorting
      if (filter.sortBy) {
        filteredReasons.sort((a: any, b: any) => {
          const direction = filter.sortDirection === "desc" ? -1 : 1
          return filter.sortBy && a[filter.sortBy] > b[filter.sortBy] ? direction : -direction
        })
      }
    }

    // Pagination
    const page = filter?.page || 1
    const limit = filter?.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedReasons = filteredReasons.slice(startIndex, endIndex)

    const response: RejectionReasonListResponse = {
      success: true,
      data: {
        reasons: paginatedReasons,
        totalCount: filteredReasons.length,
        page: page,
        limit: limit,
      },
    }

    return of(response).pipe(delay(500)) // Simulate network delay
  }

  /**
   * Get a mock rejection reason by ID
   */
  private getMockReasonById(id: string): Observable<RejectionReasonResponse> {
    const reason = this.mockReasons.find((r) => r.id === id)

    if (!reason) {
      return throwError(() => new Error("Rejection reason not found"))
    }

    return of({
      success: true,
      data: reason,
    }).pipe(delay(500))
  }

  /**
   * Create a mock rejection reason
   */
  private createMockReason(reason: RejectionReason): Observable<RejectionReasonResponse> {
    const newReason: RejectionReason = {
      ...reason,
      id: (this.mockReasons.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.mockReasons.push(newReason)

    return of({
      success: true,
      data: newReason,
      message: "Rejection reason created successfully",
    }).pipe(delay(1000))
  }

  /**
   * Update a mock rejection reason
   */
  private updateMockReason(id: string, reason: RejectionReason): Observable<RejectionReasonResponse> {
    const index = this.mockReasons.findIndex((r) => r.id === id)

    if (index === -1) {
      return throwError(() => new Error("Rejection reason not found"))
    }

    const updatedReason: RejectionReason = {
      ...this.mockReasons[index],
      ...reason,
      id: id,
      updatedAt: new Date(),
    }

    this.mockReasons[index] = updatedReason

    return of({
      success: true,
      data: updatedReason,
      message: "Rejection reason updated successfully",
    }).pipe(delay(1000))
  }

  /**
   * Delete a mock rejection reason
   */
  private deleteMockReason(id: string): Observable<RejectionReasonResponse> {
    const index = this.mockReasons.findIndex((r) => r.id === id)

    if (index === -1) {
      return throwError(() => new Error("Rejection reason not found"))
    }

    const deletedReason = this.mockReasons[index]
    this.mockReasons.splice(index, 1)

    return of({
      success: true,
      data: deletedReason,
      message: "Rejection reason deleted successfully",
    }).pipe(delay(1000))
  }
}
