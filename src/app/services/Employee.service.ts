import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
// import { Employee } from '../models/Employee.model';
// import { environment } from '../../environments/environment';
interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchName: string;
  permission: string;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private mockEmployees: Employee[] = [
    {
      id: '1',
      name: 'user1',
      email: 'defgd@user1',
      phone: 'user1',
      permission: 'user1',
      branchName: 'user1',
      status: 'true',
    },
    {
      id: '2',
      name: 'user2',
      email: 'user2@dghjffkmj',
      phone: 'user2',
      permission: 'user2',
      branchName: 'user2',
      status: 'false',
    },
    {
      id: '3',
      name: 'user2',
      email: 'user2@dghjffkmj',
      phone: 'user2',
      permission: 'user2',
      branchName: 'user2',
      status: 'true',
    },
  ];
  private apiUrl = '/api/Employees';
  constructor(private http: HttpClient) {}

  // getEmployees(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(this.apiUrl);
  // }

  // getEmployeeById(userId: string): Observable<Employee> {
  //   return this.http.get<Employee>(`${this.apiUrl}/${userId}`);
  // }

  createEmployee(Employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, Employee);
  }

  updateEmployee(userId: string, Employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${userId}`, Employee);
  }

  // deleteEmployee(userId: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  // }

  getEmployees(): Observable<any[]> {
    return of(this.mockEmployees).pipe(delay(500));
  }

  getEmployeeDetails(EmployeeId: string): Observable<any> {
    const Employee = this.mockEmployees.find((o) => o.id === EmployeeId);
    return of(Employee).pipe(delay(300));
  }

  deleteEmployee(EmployeeId: string): Observable<boolean> {
    // In a real app, this would make an API call
    return of(true).pipe(delay(300));
  }
}
