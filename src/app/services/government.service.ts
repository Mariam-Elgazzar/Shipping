import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of, throwError } from 'rxjs';
// import { Government } from '../models/Government.model';
// import { environment } from '../../environments/environment';
export interface Government {
  id: string | '';
  GovernmentName: string;
  cost: string;
  pickupCost: string;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class GovernmentService {
  private mockGovernments: Government[] = [
    {
      id: '1',
      GovernmentName: 'string',
      cost: 'string',
      pickupCost: 'string',
      status: 'true',
    },
    {
      id: '2',
      GovernmentName: '2string',
      cost: '2string',
      pickupCost: '2string',
      status: 'false',
    },
    {
      id: '3',
      GovernmentName: 'string',
      cost: 'string',
      pickupCost: 'string',
      status: 'true',
    },
  ];
  private apiUrl = '/api/Governments';
  constructor(private http: HttpClient) {}

  // getGovernments(): Observable<Government[]> {
  //   return this.http.get<Government[]>(this.apiUrl);
  // }

  // getGovernmentById(userId: string): Observable<Government> {
  //   return this.http.get<Government>(`${this.apiUrl}/${userId}`);
  // }

  createGovernment(Government: Government): Observable<Government> {
    return this.http.post<Government>(this.apiUrl, Government);
  }

  updateGovernment(
    userId: string,
    Government: Government
  ): Observable<Government> {
    return this.http.put<Government>(`${this.apiUrl}/${userId}`, Government);
  }

  // deleteGovernment(userId: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  // }

  getGovernments(): Observable<any[]> {
    return of(this.mockGovernments).pipe(delay(500));
  }

  getGovernmentDetails(GovernmentId: string): Observable<any> {
    const Government = this.mockGovernments.find((o) => o.id === GovernmentId);
    return of(Government).pipe(delay(300));
  }

  deleteGovernment(GovernmentId: string): Observable<boolean> {
    // In a real app, this would make an API call
    return of(true).pipe(delay(300));
  }

  //Amina
  ////////////////////////////////////////////////////////////////////////////
  getgovernments(): Observable<Government[]> {
    // Simulate API call with delay
    return of(this.mockGovernments).pipe(delay(800));
  }

  getgovernment(id: string): Observable<Government> {
    const government = this.mockGovernments.find((g) => g.id === id);
    if (government) {
      return of(government).pipe(delay(500));
    }
    return throwError(() => new Error('Government not found'));
  }

  creategovernment(
    government: Omit<Government, 'id' | 'createdAt' | 'updatedAt'>
  ): Observable<Government> {
    // Check if government with same name already exists
    if (
      this.mockGovernments.some(
        (g) =>
          g.GovernmentName.toLowerCase() ===
          government.GovernmentName.toLowerCase()
      )
    ) {
      return throwError(
        () => new Error('Government with this GovernmentName already exists')
      );
    }

    const now = new Date();
    const newGovernment: Government = {
      ...government,
      id: (this.mockGovernments.length + 1).toString(),
    };

    this.mockGovernments.push(newGovernment);
    return of(newGovernment).pipe(delay(800));
  }

  updategovernment(
    id: string,
    government: Partial<Government>
  ): Observable<Government> {
    const index = this.mockGovernments.findIndex((g) => g.id === id);
    if (index === -1) {
      return throwError(() => new Error('Government not found'));
    }

    // Check if GovernmentName is being updated and if it conflicts with existing GovernmentNames
    if (
      government.GovernmentName &&
      government.GovernmentName !==
        this.mockGovernments[index].GovernmentName &&
      this.mockGovernments.some(
        (g) =>
          g.GovernmentName.toLowerCase() ===
          government.GovernmentName!.toLowerCase()
      )
    ) {
      return throwError(
        () => new Error('Government with this GovernmentName already exists')
      );
    }

    this.mockGovernments[index] = {
      ...this.mockGovernments[index],
      ...government,
    };

    return of(this.mockGovernments[index]).pipe(delay(800));
  }

  deletegovernment(id: string): Observable<void> {
    const index = this.mockGovernments.findIndex((g) => g.id === id);
    if (index === -1) {
      return throwError(() => new Error('Government not found'));
    }

    this.mockGovernments.splice(index, 1);
    return of(undefined).pipe(delay(800));
  }
}
