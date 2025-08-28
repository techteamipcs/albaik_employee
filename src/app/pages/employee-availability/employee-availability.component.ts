import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from 'src/environments/environment';

interface HourStatus {
	hour: number;
	status: string;
}

interface DayAvailability {
	date: Date;
	hourlyStatus: HourStatus[];
	notes?: string;
}

interface ApiResponse {
	code: number;
	status: string;
	message: string;
	result: any[];
}

@Component({
	selector: 'app-employee-availability',
	templateUrl: './employee-availability.component.html',
	styleUrls: ['./employee-availability.component.scss']
})
export class EmployeeAvailabilityComponent implements OnInit {

	availabilityData: DayAvailability[] = [];
	loading: boolean = false;
	viewMode: 'calendar' | 'list' = 'calendar';
	filterStartDate: string = '';
	filterEndDate: string = '';

	// 24-hour format array
	hours: string[] = [];

	private token: string = '';
	private apiBaseUrl: string = environment.baseUrl //'your-api-base-url'; // Replace with your API base URL

	constructor(
		private http: HttpClient,
		private toastr: ToastrManager
	) {
		this.token = localStorage.getItem('albaik-admin-token') || '';
		this.initializeDates();
		this.generateHours();
	}

	ngOnInit(): void {
		this.loadAvailability();
	}

	private initializeDates(): void {
		const today = new Date();
		const lastWeek = new Date(today);
		lastWeek.setDate(today.getDate() - 7);

		const nextWeek = new Date(today);
		nextWeek.setDate(today.getDate() + 7);

		this.filterStartDate = lastWeek.toISOString().split('T')[0];
		this.filterEndDate = nextWeek.toISOString().split('T')[0];
	}

	private generateHours(): void {
		for (let i = 0; i < 24; i++) {
			this.hours.push(i.toString().padStart(2, '0'));
		}
	}

	loadAvailability(): void {
		if (!this.token) {
			this.toastr.errorToastr('Authentication token not found');
			return;
		}

		this.loading = true;

		const requestBody = {
			token: this.token,
			startDate: this.filterStartDate,
			endDate: this.filterEndDate
		};

		// Replace with your actual API endpoint
		this.http.post<ApiResponse>(`${this.apiBaseUrl}/api/availability/getempavail`, requestBody)
			.subscribe({
				next: (response) => {
					this.loading = false;
					if (response.code === 200) {
						this.processAvailabilityData(response.result);
					} else {
						this.toastr.errorToastr(response.message || 'Failed to load availability data');
						this.availabilityData = [];
					}
				},
				error: (error) => {
					this.loading = false;
					this.toastr.errorToastr('Error loading availability data');
					console.error('Availability load error:', error);
					// For demonstration, generate sample data
					this.generateSampleData();
				}
			});
	}

	private processAvailabilityData(apiData: any): void {
		// If result is a single object with availabilityData
		if (apiData && apiData.availabilityData) {
			this.availabilityData = apiData.availabilityData.map((day: any) => ({
				date: new Date(day.date),
				hourlyStatus: day.hourlyStatus || [],
				notes: day.notes || ''
			}));
		}
		// If result is already an array
		else if (Array.isArray(apiData)) {
			this.availabilityData = apiData.map((day: any) => ({
				date: new Date(day.date),
				hourlyStatus: day.hourlyStatus || [],
				notes: day.notes || ''
			}));
		}
		else {
			this.availabilityData = [];
		}

		// Sort by date
		this.availabilityData.sort((a, b) => a.date.getTime() - b.date.getTime());
	}


	// Generate sample data for demonstration
	private generateSampleData(): void {
		const sampleData: DayAvailability[] = [];
		const startDate = new Date(this.filterStartDate);
		const endDate = new Date(this.filterEndDate);

		for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
			const dayData: DayAvailability = {
				date: new Date(d),
				hourlyStatus: [],
				notes: Math.random() > 0.7 ? 'Sample note for this day' : undefined
			};

			// Generate random availability pattern
			for (let hour = 0; hour < 24; hour++) {
				let status = 'Available';

				// Night hours (0-6, 22-23) - mostly unavailable
				if (hour < 7 || hour > 21) {
					status = Math.random() > 0.8 ? 'Available' : 'Unavailable';
				}
				// Working hours (9-17) - mostly available
				else if (hour >= 9 && hour <= 17) {
					const rand = Math.random();
					if (rand < 0.8) status = 'Available';
					else if (rand < 0.9) status = 'Leave';
					else status = 'Sick';
				}
				// Other hours - mixed
				else {
					const rand = Math.random();
					if (rand < 0.6) status = 'Available';
					else if (rand < 0.8) status = 'Unavailable';
					else status = 'Overtime';
				}

				dayData.hourlyStatus.push({ hour, status });
			}

			sampleData.push(dayData);
		}

		this.availabilityData = sampleData;
	}

	getStatusClass(status: string): string {
		const statusClasses: { [key: string]: string } = {
			'Available': 'status-available',
			'Unavailable': 'status-unavailable',
			'Leave': 'status-leave',
			'Sick': 'status-sick',
			'Holiday': 'status-holiday',
			'Overtime': 'status-overtime'
		};
		return statusClasses[status] || 'status-unavailable';
	}

	getStatusTooltip(status: string, date: Date, hour: number): string {
		const timeStr = `${hour.toString().padStart(2, '0')}:00`;
		const dateStr = date.toLocaleDateString();
		return `${dateStr} at ${timeStr} - ${status}`;
	}

	getDaySummary(dayData: DayAvailability): string {
		const statusCounts: { [key: string]: number } = {};

		dayData.hourlyStatus.forEach(hourStatus => {
			statusCounts[hourStatus.status] = (statusCounts[hourStatus.status] || 0) + 1;
		});

		const available = statusCounts['Available'] || 0;
		const total = dayData.hourlyStatus.length;

		return `${available}/${total} hours available`;
	}

	getHoursByStatus(dayData: DayAvailability, status: string): number[] {
		return dayData.hourlyStatus
			.filter(hourStatus => hourStatus.status === status)
			.map(hourStatus => hourStatus.hour)
			.sort((a, b) => a - b);
	}

	formatHourRanges(hours: number[]): string {
		if (hours.length === 0) return '';

		const ranges: string[] = [];
		let start = hours[0];
		let end = hours[0];

		for (let i = 1; i < hours.length; i++) {
			if (hours[i] === end + 1) {
				end = hours[i];
			} else {
				if (start === end) {
					ranges.push(`${start.toString().padStart(2, '0')}:00`);
				} else {
					ranges.push(`${start.toString().padStart(2, '0')}:00 - ${(end + 1).toString().padStart(2, '0')}:00`);
				}
				start = hours[i];
				end = hours[i];
			}
		}

		// Add the last range
		if (start === end) {
			ranges.push(`${start.toString().padStart(2, '0')}:00`);
		} else {
			ranges.push(`${start.toString().padStart(2, '0')}:00 - ${(end + 1).toString().padStart(2, '0')}:00`);
		}

		return ranges.join(', ');
	}

	getStatistics(): { [key: string]: number } {
		const stats = {
			available: 0,
			unavailable: 0,
			leave: 0,
			sick: 0,
			holiday: 0,
			overtime: 0
		};

		this.availabilityData.forEach(dayData => {
			dayData.hourlyStatus.forEach(hourStatus => {
				const status = hourStatus.status.toLowerCase();
				if (stats.hasOwnProperty(status)) {
					stats[status as keyof typeof stats]++;
				}
			});
		});

		return stats;
	}
}
