import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  constructor(
    private http: HttpClient
  ) { }

  getCertificationDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/certification/viewCertification';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getCertificationWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/certification/getCertificationById';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  addCertification = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/certification/addCertification';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editCertificationdata = (moreData: any, Id: any): Observable<any> => {
    let endpoint = environment.baseUrl + '/api/certification/editCertification';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletecertification = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/certification/deleteCertification';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallCertificationDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/certification/getAllCertification';
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
