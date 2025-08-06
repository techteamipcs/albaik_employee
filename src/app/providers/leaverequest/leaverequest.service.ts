import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LeaverequestService {

	constructor(private http: HttpClient) { }

	addLeavedata = (moreData: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/leaverequest/addLeaverequest';
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getLeaveDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/leaverequest/viewLeaverequest';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getLeaveWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/leaverequest/getLeaverequestById';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editLeavedata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/leaverequest/editLeaverequest';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteLeave = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/leaverequest/deleteLeaverequest';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	/**
	 * Returns the headers for the HTTP request.
	 * @returns {Object} The headers object.
	 */
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
