import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable } from "rxjs";
import { Employee } from "./employee";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerApi = environment.apiBaseUrl;

  constructor(private http:HttpClient){}
  
  
    // This will get all employee 
    public getEmployee() : Observable<Employee[]>{
      return this.http.get<Employee[]>(`${this.apiServerApi}/employee/all`);
  }

  // This will post employee 
  public addEmployee(employee : Employee) : Observable<Employee>{
      // employee is payload to add employe from ui 
      return this.http.post<Employee>(`${this.apiServerApi}/employee/add`,employee);
  }

  // This will post employee 
  public updateEmployee(employee : Employee) : Observable<Employee>{
      // employee is payload to add employe from ui 
      return this.http.put<Employee>(`${this.apiServerApi}/employee/update`,employee);
  }

  // This will post employee 
  public deleteEmployee(employeeId : number) : Observable<void>{
      // employee is payload to add employe from ui 
      return this.http.delete<void>(`${this.apiServerApi}/employee/delete/${employeeId}`);
  }
}
