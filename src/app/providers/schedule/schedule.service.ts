import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ScheduleService {

	constructor(
		private http: HttpClient
	) { }

	getScheduleDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/schedule/viewSchedule';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getScheduleWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/schedule/getScheduleById';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	addSchedule = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/schedule/addSchedule';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editScheduledata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/schedule/editSchedule';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteSchedule = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/schedule/deleteSchedule';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getallScheduleDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/schedule/getAllSchedule';
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
