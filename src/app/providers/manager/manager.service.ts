import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(
      private http: HttpClient
    ) { }
  
    getManagerDetails = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/manager/viewManager';
      return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getManagerWithId = (moreData: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/manager/getManagerById';
      return this.http
        .post(endpoint, moreData, this.getRequestHeaders())
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        );
    };
  
    addManager = (moreData: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/manager/addManager';
      return this.http
        .post(endpoint, moreData, this.getRequestHeaders())
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        );
    };
  
    editManagerdata = (moreData: any, Id: any): Observable<any> => {
      let endpoint = environment.baseUrl + '/api/manager/editManager';
      if (Id) {
        endpoint += `?id=${Id}`;
      }
      return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    deletemanager = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/manager/deleteManager';
      return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getallManagerDetails = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/manager/getAllManager';
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
