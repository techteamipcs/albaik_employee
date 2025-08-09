import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
      private http: HttpClient
    ) { }
  
    getPositionDetails = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/position/viewPosition';
      return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getPositionWithId = (moreData: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/position/getPositionById';
      return this.http
        .post(endpoint, moreData, this.getRequestHeaders())
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        );
    };
  
    addPosition = (moreData: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/position/addPosition';
      return this.http
        .post(endpoint, moreData, this.getRequestHeaders())
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        );
    };
  
    editPositiondata = (moreData: any, Id: any): Observable<any> => {
      let endpoint = environment.baseUrl + '/api/position/editPosition';
      if (Id) {
        endpoint += `?id=${Id}`;
      }
      return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    deleteposition = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/position/deletePosition';
      return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getallPositionDetails = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/position/getAllPosition';
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
