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
	constructor(
		private employeeService: EmployeeService,
	) {
		this.token = localStorage.getItem('albaik-admin-token');
	}

	ngOnInit() {
		this.getEmpData();
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



}
