import { Component } from '@angular/core';
import { EmployeeService } from '../../../providers/employee/employee.service';
@Component({
	selector: 'app-shift-schedule',
	templateUrl: './shift-schedule.component.html',
	styleUrls: ['./shift-schedule.component.scss']
})
export class ShiftScheduleComponent {


	Data: any;
	upcomingShifts: any[] = [];
	token: string | null;
	today: Date = new Date();


	constructor(private employeeService: EmployeeService) {
		this.token = localStorage.getItem('albaik-admin-token');
	}


	ngOnInit() {
		this.getEmpData();
	}


	getEmpData() {
		const obj: any = { token: this.token };
		this.employeeService.getEmpAvailDetails(obj).subscribe((response: any) => {
			if (response.code === 200 && response.result) {
				this.Data = response.result;


				if (this.Data.availabilityData) {
					this.upcomingShifts = this.generateShiftsFromAvailability(this.Data.availabilityData, this.Data.departmentDetails);
				}
			}
		});
	}


	private generateShiftsFromAvailability(availabilityData: any[], deptDetails: any[]): any[] {
		const groupedShifts: any = {};
		const department = deptDetails?.[0]?.name || 'Department';
	
		availabilityData.forEach((dayData: any) => {
			const dateObj = new Date(dayData.date);
			const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
			const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
			const dateKey = dateObj.toDateString();
	
			if (!groupedShifts[dateKey]) {
				groupedShifts[dateKey] = {
					day: day,
					date: dateObj.getDate(),
					month: month,
					shifts: []
				};
			}
	
			let startHour: number | null = null;
			let endHour: number | null = null;
	
			dayData.hourlyStatus.forEach((slot: any, index: number) => {
				if (slot.status === 'Available') {
					if (startHour === null) startHour = slot.hour;
					endHour = slot.hour;
				} else {
					if (startHour !== null) {
						groupedShifts[dateKey].shifts.push({
							time: this.formatTimeRange(startHour, endHour),
							department: department
						});
						startHour = null;
						endHour = null;
					}
				}
	
				// handle last slot
				if (index === dayData.hourlyStatus.length - 1 && startHour !== null) {
					groupedShifts[dateKey].shifts.push({
						time: this.formatTimeRange(startHour, endHour),
						department: department
					});
				}
			});
		});
	
		return Object.values(groupedShifts);
	}
	


	private formatTimeRange(startHour: number, endHour: number): string {
		const formatHour = (h: number) => {
			const date = new Date();
			date.setHours(h, 0, 0, 0);
			return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
		};


		return `${formatHour(startHour)} - ${formatHour(endHour + 1)}`;
	}
}
