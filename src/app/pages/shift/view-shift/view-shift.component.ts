import { Component, EventEmitter, Input, OnInit, Output, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

// Services
import { ShiftService } from '../../../providers/shift/shift.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
	selector: 'app-view-shift',
	templateUrl: './view-shift.component.html',
	styleUrls: ['./view-shift.component.scss']
})
export class ViewShiftComponent {

	msg_danger: boolean = false;
	shiftData: any;

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	searchText = '';

	constructor(
		private router: Router,
		private shiftService: ShiftService,
		private toastr: ToastrManager
	) {

	}

	ngOnInit(): void {
		this.get_shiftData();
	}

	get_shiftData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.shiftService.getShiftDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.shiftData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}


	deleteShift(listid: any) {
		if (confirm("Are you sure to delete this Shift")) {
			var mylist = { id: listid };
			this.shiftService.deleteShift(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						this.get_shiftData();
						this.router.navigate(['/shift/view']);
					}
				},
			);
		}
	}


	onListChangeShift(event: any) {
		this.currentPage = event;
		this.get_shiftData();
	}

	searchShift() {
		if (this.searchText) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_shiftData();
	}

}
