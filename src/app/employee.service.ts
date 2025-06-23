import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = environment.baseUrl;

  // private getURL1 = "http://localhost:8080/employees";

  // private baseURL = "http://localhost:8080/employee";

  constructor(private httpClient: HttpClient) { }

  getEmployeesList(): Observable<Employee[]>{

    return this.httpClient.get<Employee[]>(`${this.baseURL}/employees`);

  }

  getEmployee(empId: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/employee/${empId}`);
  }

  postEmployee(newEmployee: Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.baseURL}/employee`, newEmployee);
  }

  putEmployee(empId: number, updatedEmployee: Employee): Observable<Employee>{
    return this.httpClient.put<Employee>(`${this.baseURL}/employee/${empId}`, updatedEmployee);
  }

  deleteEmployee(empId: number): Observable<string>{
    return this.httpClient.delete<string>(`${this.baseURL}/employee/${empId}`);
  }

}
