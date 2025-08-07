import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
      private http: HttpClient
    ) { }
  
    getRequestDetails = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/request/viewRequest';
      return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getRequestWithId = (moreData: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/request/getRequestById';
      return this.http
        .post(endpoint, moreData, this.getRequestHeaders())
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        );
    };
  
    addRequest = (moreData: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/request/addRequest';
      return this.http
        .post(endpoint, moreData, this.getRequestHeaders())
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        );
    };
  
    editRequestdata = (moreData: any, Id: any): Observable<any> => {
      let endpoint = environment.baseUrl + '/api/request/editRequest';
      if (Id) {
        endpoint += `?id=${Id}`;
      }
      return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    deleterequest = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/request/deleteRequest';
      return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getallRequestDetails = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/request/getAllRequest';
      return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };

    getExistedRequest = (moreData: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/request/getExistedRequest';
      return this.http
        .post(endpoint, moreData, this.getRequestHeaders())
        .pipe(
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
