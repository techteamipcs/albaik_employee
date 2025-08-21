import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class RegisterloginService {

	constructor(private http: HttpClient) { }

	validateLogin = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/employee/login';
		return this.http
			.post(endpoint, moreData, { observe: 'response' as 'body' })
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	updateProfile = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/employee/updateprofile';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editProfile = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/employee/edituserprofile';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	}

	getUser = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/employee/getuserwithid';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	forgotPassword = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/employee/forgotcustomerpasswordlink';
		return this.http
			.post(endpoint, moreData)
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	ChangePassword = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/employee/updateforgotpassword';
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
