import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Availability {
	month: string;
	days: number[];
}

@Injectable({
	providedIn: 'root'
})
export class EmployeeService {

	constructor(
		private http: HttpClient
	) { }

	getEmployeeDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/employee/viewEmployee';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getEmployeeWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/employee/getEmployeeById';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	addEmployee = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/employee/addEmployee';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editEmployeedata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/employee/editEmployee';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteemployee = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/employee/deleteEmployee';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getallEmployeeDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/employee/getAllEmployee';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getEmpDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/employee/getempbytoken';
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
