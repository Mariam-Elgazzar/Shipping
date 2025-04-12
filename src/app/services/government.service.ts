import { Injectable } from "@angular/core"
import { Observable, of, throwError } from "rxjs"
import { delay } from "rxjs/operators"
import { Government } from "../models/government.interface"


@Injectable({
  providedIn: "root",
})
export class GovernmentService {
  // Mock data for demo purposes
  private mockGovernments: Government[] = [
    {
      id: "1",
      name: "Cairo",
      status: "active",
     
    },
    {
      id: "2",
      name: "Alexandria",
      status: "active",
      
    },
    {
      id: "3",
      name: "Giza",
      status: "active",
     
    },
    {
      id: "4",
      name: "Luxor",
      status: "inactive",
     
    },
    {
      id: "5",
      name: "Aswan",
      status: "active",
     
    },
  ]

  constructor() {}

  getGovernments(): Observable<Government[]> {
    // Simulate API call with delay
    return of(this.mockGovernments).pipe(delay(800))
  }

  getGovernment(id: string): Observable<Government> {
    const government = this.mockGovernments.find((g) => g.id === id)
    if (government) {
      return of(government).pipe(delay(500))
    }
    return throwError(() => new Error("Government not found"))
  }

  createGovernment(government: Omit<Government, "id" | "createdAt" | "updatedAt">): Observable<Government> {
    // Check if government with same name already exists
    if (this.mockGovernments.some((g) => g.name.toLowerCase() === government.name.toLowerCase())) {
      return throwError(() => new Error("Government with this name already exists"))
    }

    const now = new Date()
    const newGovernment: Government = {
      ...government,
      id: (this.mockGovernments.length + 1).toString(),
    
    }

    this.mockGovernments.push(newGovernment)
    return of(newGovernment).pipe(delay(800))
  }

  updateGovernment(id: string, government: Partial<Government>): Observable<Government> {
    const index = this.mockGovernments.findIndex((g) => g.id === id)
    if (index === -1) {
      return throwError(() => new Error("Government not found"))
    }

    // Check if name is being updated and if it conflicts with existing names
    if (
      government.name &&
      government.name !== this.mockGovernments[index].name &&
      this.mockGovernments.some((g) => g.name.toLowerCase() === government.name!.toLowerCase())
    ) {
      return throwError(() => new Error("Government with this name already exists"))
    }

    this.mockGovernments[index] = {
      ...this.mockGovernments[index],
      ...government,
     
    }

    return of(this.mockGovernments[index]).pipe(delay(800))
  }

  deleteGovernment(id: string): Observable<void> {
    const index = this.mockGovernments.findIndex((g) => g.id === id)
    if (index === -1) {
      return throwError(() => new Error("Government not found"))
    }

    this.mockGovernments.splice(index, 1)
    return of(undefined).pipe(delay(800))
  }
}

