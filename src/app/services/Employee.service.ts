import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  IAddEmployee,
  IBranchParams,
  IGetAllEmployee,
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

  GetAll(params: IBranchParams): Observable<IGetAllEmployee[]> {
    let httpParams = new HttpParams()
      .set('PageSize', params.pageSize.toString())
      .set('PageIndex', params.pageIndex.toString());

    if (params.SearchByName) {
      httpParams = httpParams.set('SearchByName', params.SearchByName);
    }

    return this.http
      .get<IGetAllEmployee[]>(this.BaseUrl + '/Getall', { params: httpParams })
      .pipe(
        catchError((error) => {
          console.error('Error fetching employees:', error);
          return throwError(() => new Error('Failed to fetch employees.'));
        })
      );
  }

  GetById(id: string): Observable<IUpdateEmployee> {
    return this.http.get<IUpdateEmployee>(`${this.BaseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching employee by ID:', error);
        return throwError(() => new Error('Failed to fetch employee details.'));
      })
    );
  }

  DeleteEmployee(id: string): Observable<IGetAllEmployee> {
    return this.http.delete<IGetAllEmployee>(`${this.BaseUrl}?id=${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting employee:', error);
        return throwError(() => new Error('Failed to delete employee.'));
      })
    );
  }

  AddEmployee(emp: IAddEmployee): Observable<string> {
    return this.http.post<string>(this.BaseUrl, emp).pipe(
      catchError((error) => {
        console.error('Error adding employee:', error);
        return throwError(() => new Error('Failed to add employee.'));
      })
    );
  }

  UpdateEmployee(
    id: string,
    Emp: IUpdateEmployee
  ): Observable<IUpdateEmployee> {
    return this.http.put<IUpdateEmployee>(`${this.BaseUrl}?id=${id}`, Emp).pipe(
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
