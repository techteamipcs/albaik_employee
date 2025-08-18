import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ScheduleService } from '../../../providers/schedule/schedule.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-schedule-list',
	templateUrl: './schedule-list.component.html',
	styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent {


	msg_danger: boolean = false;
	Data: any = [];
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';
	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedData: any;
	closeResult = '';
	modalReference = null;
	selectedCustomergroup: any;
	deletedMediaFiles: any = [];
	deletMediaFilesData: any = [];
	constructor(
		private router: Router,
		private scheduleService: ScheduleService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('albaik-admin-token');
	}

	ngOnInit(): void {
		this.get_Data();
		// this.get_VendorData();
	}

	get_Data() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.scheduleService.getScheduleDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.Data = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
						this.Data = [];
					}
				}
			},
		);
	}

	deleteData() {
		if (this.selectedData) {
			var mylist = { id: this.selectedData._id };
			mylist['token'] = this.token;
			this.scheduleService.deleteSchedule(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_Data();
						this.modalService.dismissAll();
						this.router.navigate(['/schedule/view']);
					}
				},
			);
		}
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_Data();
	}

	open(content, data) {
		this.selectedData = data;
		if (this.selectedData) {
			var mylist = { id: this.selectedData._id };
			this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
				(result) => {
					this.closeResult = `Closed with: ${result}`;
				},
				(reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				},
			);
		}
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	closeModal() {
		this.activeModal.close();
	}
}
