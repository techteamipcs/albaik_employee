import { Component, EventEmitter, Input, OnInit, Output, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

// Services
import { LeaverequestService } from '../../../providers/leaverequest/leaverequest.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
	selector: 'app-view-leaverequest',
	templateUrl: './view-leaverequest.component.html',
	styleUrls: ['./view-leaverequest.component.scss']
})
export class ViewLeaverequestComponent {

	msg_danger: boolean = false;
	leaveData: any;

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	searchText = '';
	empdetails = [{
		'name'	: 'Asad',
		'empId':'ALBKEMP-123',
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
		private router: Router,
		private leaveRequestService: LeaverequestService,
		private toastr: ToastrManager
	) {

	}

	ngOnInit(): void {
		this.get_LeaveData();
	}

	get_LeaveData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.leaveRequestService.getLeaveDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.leaveData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}


	deleteLeave(listid: any) {
		if (confirm("Are you sure to delete this Leave")) {
			var mylist = { id: listid };
			this.leaveRequestService.deleteLeave(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						this.get_LeaveData();
						this.router.navigate(['/leave/view']);
					}
				},
			);
		}
	}


	onListChangeLeave(event: any) {
		this.currentPage = event;
		this.get_LeaveData();
	}

	searchLeave() {
		if (this.searchText) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_LeaveData();
	}

}
