import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
	providedIn: 'root'
})
export class ShiftService {

	constructor(private http: HttpClient) { }

	addShiftdata = (moreData: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/shift/addShift';
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getShiftDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/shift/viewShift';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getShiftWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/shift/getShiftById';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editShiftdata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/shift/editShift';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteShift = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/shift/deleteShift';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getallShiftDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/shift/getAllShift';
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
