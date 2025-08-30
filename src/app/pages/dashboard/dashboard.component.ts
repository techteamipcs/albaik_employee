import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { EmployeeService } from '../../providers/employee/employee.service';

import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

	throw_msg: any;
	msg_success: boolean = false;
	msg_danger: boolean = false;

	currentPage: number = 1;
	currentLimit: number = 10;
	totalRecord: number = 0;
	Data: any;
	token: any;
	TotalHours: number = 0;
	overtime: number = 0;
	leaveHours: number = 0;
	remainingHours: number = 0;
	
	empdetails = [{
		'name': 'Asad',
		'empId': 'ALBKEMP-123',
		'position': 'Level A',
		'department': 'Production',
		'location': 'dubai',
		'email': 'asadipcs@gmail.com',
		'phone': '123-456-7890',
		'photo': 'path/to/photo.jpg',
		'shift': 'Morning',
		'leaves': 12,
		'joiningDate': '2020-01-15'
	}];


	totalHoursDemo: number = 24;
	availabeHoursdemo: number = 10;
	remainingHoursDemo: number = this.totalHoursDemo - this.availabeHoursdemo;
	percentDemo: number = Math.round((this.remainingHoursDemo / this.totalHoursDemo) * 100 * 10) / 10;

	constructor(
		private employeeService: EmployeeService,
	) {
		this.token = localStorage.getItem('albaik-admin-token');
	}

	ngOnInit() {
		this.getEmpData();
		this.getEmpAvailData();
	}

	getEmpData() {
		const obj = {};
		obj['token'] = this.token;
		this.employeeService.getEmpDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.Data = response.result;
						this.totalRecord = response?.count;
						this.msg_success = true;
					}
					else {
						this.msg_danger = true;
					}
				}
			},
		);
	}


	getEmpAvailData() {
		const obj: any = {};
		obj['token'] = this.token;
	
		this.employeeService.getEmpAvailDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						const availabilityData = response.result.availabilityData[0]?.hourlyStatus || [];
						// ✅ Filter only "available" hours
						const availableHours = availabilityData
							.filter((hour: any) => hour.status === "Available" || hour.status === "available")
							.map((hour: any) => hour.hour); // or whatever field holds the hour
	
						const leaveHours = availabilityData
							.filter((hour: any) => hour.status === "Leave" || hour.status === "leave")
							.map((hour: any) => hour.hour); // or whatever field holds the hour
	
						this.TotalHours = availableHours.length;
						this.remainingHours = 24 - this.TotalHours;
						this.leaveHours = leaveHours.length;
						
						if(this.TotalHours>=8){
							this.overtime = this.TotalHours-8;
						}else{
							this.overtime = 0;
						}
					} else {
						console.warn("No data found");
					}
				} else {
					console.error("API Error:", response);
				}
			}
		);
	}
	



	
}
