import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class MealService {

	constructor(
		private http: HttpClient
	) { }

	getMealDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/meal/viewMeal';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getMealWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/meal/getMealById';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	addMeal = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/meal/addMeal';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editMealdata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/meal/editMeal';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteMeal = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/meal/deleteMeal';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getallMealDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/meal/getAllMeal';
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
