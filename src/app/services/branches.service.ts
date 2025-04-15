import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Branch {
  id: string;
  name: string;
  dateAdded: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  private mockBranches: Branch[] = [
    {
      id: '1',
      name: 'Branch 1',
      dateAdded: '2023-10-01',
      status: 'true',
    },
    {
      id: '2',
      name: 'Branch 2',
      dateAdded: '2023-10-02',
      status: 'false',
    },
    {
      id: '3',
      name: 'Branch 3',
      dateAdded: '2023-10-03',
      status: 'true',
    },
  ];

  private apiUrl = '/api/Branches';

  constructor(private http: HttpClient) {}

  getBranches(): Observable<Branch[]> {
    // Simulate API call with mock data
    return of(this.mockBranches).pipe(delay(800));
    // Uncomment for real API
    // return this.http.get<Branch[]>(this.apiUrl);
  }

  getBranchDetails(branchId: string): Observable<Branch> {
    const branch = this.mockBranches.find((b) => b.id === branchId);
    if (branch) {
      return of(branch).pipe(delay(500));
    }
    return throwError(() => new Error('Branch not found'));
    // Uncomment for real API
    // return this.http.get<Branch>(`${this.apiUrl}/${branchId}`);
  }

  createBranch(branch: Omit<Branch, 'id' | 'dateAdded'>): Observable<Branch> {
    // Check for duplicate branch name
    if (
      this.mockBranches.some(
        (b) => b.name.toLowerCase() === branch.name.toLowerCase()
      )
    ) {
      return throwError(() => new Error('Branch with this name already exists'));
    }

    const newBranch: Branch = {
      id: (this.mockBranches.length + 1).toString(),
      name: branch.name,
      dateAdded: new Date().toISOString().split('T')[0], // Current date as YYYY-MM-DD
      status: branch.status,
    };

    this.mockBranches.push(newBranch);
    return of(newBranch).pipe(delay(800));
    // Uncomment for real API
    // return this.http.post<Branch>(this.apiUrl, newBranch);
  }

  updateBranch(id: string, branch: Partial<Branch>): Observable<Branch> {
    const index = this.mockBranches.findIndex((b) => b.id === id);
    if (index === -1) {
      return throwError(() => new Error('Branch not found'));
    }

    // Check for duplicate branch name (excluding current branch)
    if (
      branch.name &&
      branch.name !== this.mockBranches[index].name &&
      this.mockBranches.some(
        (b) => b.name.toLowerCase() === branch.name!.toLowerCase()
      )
    ) {
      return throwError(() => new Error('Branch with this name already exists'));
    }

    this.mockBranches[index] = {
      ...this.mockBranches[index],
      ...branch,
    };

    return of(this.mockBranches[index]).pipe(delay(800));
    // Uncomment for real API
    // return this.http.put<Branch>(`${this.apiUrl}/${id}`, branch);
  }

  deleteBranch(branchId: string): Observable<void> {
    const index = this.mockBranches.findIndex((b) => b.id === branchId);
    if (index === -1) {
      return throwError(() => new Error('Branch not found'));
    }

    this.mockBranches.splice(index, 1);
    return of(undefined).pipe(delay(800));
    // Uncomment for real API
    // return this.http.delete<void>(`${this.apiUrl}/${branchId}`);
  }
}