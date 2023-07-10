import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Employee } from '../model/employee';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient) { }

  url: string = 'https://jsonplaceholder.typicode.com/users';
  urlPost:string = 'https://jsonplaceholder.typicode.com/posts';

  retrieveEmployeeData(){
    return this.httpClient.get<Employee[]>(this.url)
    .pipe(
        catchError(this.handleError)
      );
  }
  handleError(error:HttpErrorResponse){
    return Observable.throw(error.message || "server error.");
  }



  addEmployee(emp:Employee){
    this.httpClient.put<Employee[]>(this.url, emp)
    .pipe(
        catchError(this.handleError)
      );
  }


  deleteEmployee(id:number){
    return true;
  }


  editEmployee(emp:Employee){
    return true;
  }


}
