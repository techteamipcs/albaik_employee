import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) { }

  getDepartmentDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/department/viewDepartment';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getDepartmentWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/department/getDepartmentById';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  addDepartment = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/department/addDepartment';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editDepartmentdata = (moreData: any, Id: any): Observable<any> => {
    let endpoint = environment.baseUrl + '/api/department/editDepartment';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletedepartment = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/department/deleteDepartment';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallDepartmentDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/department/getAllDepartment';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  protected getRequestHeaders(): {
    headers: HttpHeaders | { [header: string]: string | string[] };
  } {
    let headers;
    const token = localStorage.getItem('albaik-admin-token');
    headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return { headers: headers };
  }
}
