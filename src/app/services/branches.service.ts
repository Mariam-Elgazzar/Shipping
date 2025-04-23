import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  PaginatedBranchResponse,
  BranchResponse,
  Branch,
} from '../models/branches.model';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  private apiUrl = environment.apiUrl + '/Branches';

  constructor(private http: HttpClient) {}

  getBranches(
    pageIndex: number,
    pageSize: number
  ): Observable<{ branches: Branch[]; totalCount: number }> {
    return this.http
      .get<PaginatedBranchResponse>(
        `${this.apiUrl}/GetAll?pageIndex=${pageIndex}&pageSize=${pageSize}`
      )
      .pipe(
        map((response: PaginatedBranchResponse) => ({
          branches: response.data.map((branch: BranchResponse) => ({
            id: branch.id.toString(), // Convert number to string
            name: branch.name,
            dateAdded: branch.creationDate,
            status: branch.isDeleted ? 'Deleted' : 'Active',
          })),
          totalCount: response.totalCount,
        }))
      );
  }

  getBranchDetails(branchId: string): Observable<Branch> {
    return this.http
      .get<BranchResponse>(`${this.apiUrl}/GetById/${branchId}`)
      .pipe(
        map((branch: BranchResponse) => ({
          id: branch.id.toString(),
          name: branch.name,
          dateAdded: branch.creationDate,
          status: branch.isDeleted ? 'Deleted' : 'Active',
        }))
      );
  }

  createBranch(branch: Omit<Branch, 'id' | 'dateAdded'>): Observable<Branch> {
    return this.http.post<BranchResponse>(this.apiUrl + '/Create', branch).pipe(
      map((branch: BranchResponse) => ({
        id: branch.id.toString(),
        name: branch.name,
        dateAdded: branch.creationDate,
        status: branch.isDeleted ? 'Deleted' : 'Active',
      }))
    );
  }

  updateBranch(id: string, branch: Partial<Branch>): Observable<Branch> {
    return this.http
      .put<BranchResponse>(`${this.apiUrl}/Update/${id}`, branch)
      .pipe(
        map((branch: BranchResponse) => ({
          id: branch.id.toString(),
          name: branch.name,
          dateAdded: branch.creationDate,
          status: branch.isDeleted ? 'Deleted' : 'Active',
        }))
      );
  }

  deleteBranch(branchId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${branchId}`);
  }
}
