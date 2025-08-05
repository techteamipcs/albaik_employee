import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient
  ) { }

  getRoleDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/role/viewRole';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getRoleWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/role/getRoleById';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  addRole = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/role/addRole';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editRoledata = (moreData: any, Id: any): Observable<any> => {
    let endpoint = environment.baseUrl + '/api/role/editRole';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleterole = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/role/deleteRole';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallRoleDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/role/getAllRole';
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
