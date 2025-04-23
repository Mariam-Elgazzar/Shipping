import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  IAddEmployee,
  // IAddEmployee,
  IBranchParams,
  IEmployeeDetails,
  IGetAllEmployee,
  IGetAllEmployeeResponse,
  IGroupPages,
  IUpdateEmployee,
} from '../models/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  BaseUrl: string = environment.apiUrl + '/Employees';

  constructor(private http: HttpClient) {}

  GetAll(params: IBranchParams): Observable<IGetAllEmployeeResponse> {
    let httpParams = new HttpParams()
      .set('PageSize', params.pageSize.toString())
      .set('PageIndex', params.pageIndex.toString());

    if (params.SearchByName) {
      httpParams = httpParams.set('Search', params.SearchByName); // Match API parameter name
    }
    if (params.Branch) {
      httpParams = httpParams.set('Branch', params.Branch);
    }
    if (params.IsActive !== undefined) {
      httpParams = httpParams.set('IsActive', params.IsActive.toString());
    }
    if (params.Sort) {
      httpParams = httpParams.set('Sort', params.Sort);
    }

    return this.http
      .get<IGetAllEmployeeResponse>(`${this.BaseUrl}/GetAll`, {
        params: httpParams,
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching employees:', error);
          return throwError(() => new Error('Failed to fetch employees.'));
        })
      );
  }

  GetById(id: string): Observable<IEmployeeDetails> {
    return this.http
      .get<IEmployeeDetails>(`${this.BaseUrl}/GetById/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching employee by ID:', error);
          return throwError(
            () => new Error('Failed to fetch employee details.')
          );
        })
      );
  }

  DeleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BaseUrl}/Delete/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting employee:', error);
        return throwError(() => new Error('Failed to delete employee.'));
      })
    );
  }

  AddEmployee(emp: IAddEmployee): Observable<string> {
    return this.http.post<string>(`${this.BaseUrl}/Add`, emp).pipe(
      catchError((error) => {
        console.error('Error adding employee:', error);
        return throwError(() => new Error('Failed to add employee.'));
      })
    );
  }

  UpdateEmployee(
    id: string,
    emp: IUpdateEmployee
  ): Observable<IUpdateEmployee> {
    return this.http.put<IUpdateEmployee>(`${this.BaseUrl}/update`, emp).pipe(
      catchError((error) => {
        console.error('Error updating employee:', error);
        return throwError(() => new Error('Failed to update employee.'));
      })
    );
  }

  GetAllGroup(): Observable<IGroupPages> {
    return this.http.get<IGroupPages>(`${this.BaseUrl}/GetAll`).pipe(
      catchError((error) => {
        console.error('Error fetching groups:', error);
        return throwError(() => new Error('Failed to fetch groups.'));
      })
    );
  }
}
