import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  constructor(
    private http: HttpClient
  ) { }

  getPosDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/pos/viewPos';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getPosWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/pos/getPosById';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  addPos = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/pos/addPos';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editPosdata = (moreData: any, Id: any): Observable<any> => {
    let endpoint = environment.baseUrl + '/api/pos/editPos';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletepos = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/pos/deletePos';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallPosDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/pos/getAllPos';
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
