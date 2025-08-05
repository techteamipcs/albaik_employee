import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AttendanceService } from '../../../providers/attendance/attendance.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})
export class ViewAttendanceComponent {
  msg_danger: boolean = false;
	AttendanceData: any = [];
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';
	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedAttendance: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	deletedMediaFiles: any = [];
	deletMediaFilesData: any = [];
	constructor(
		private router: Router,
		private attendanceService: AttendanceService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_AttendanceData();
		// this.get_VendorData();
	}

	get_AttendanceData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.attendanceService.getAttendanceDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.AttendanceData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}
				}
			},
		);
	}

	deleteAttendance()
  {
    if (this.selectedAttendance) {
			var mylist = { id: this.selectedAttendance._id };
			mylist['token'] = this.token;
      this.attendanceService.deleteattendance(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
						if(this.selectedAttendance && this.selectedAttendance.image){
							this.selectedAttendance.image.forEach(image => {
								if(image && image.src){
									this.deletedMediaFiles.push(image.src);
									this.deletMediaFilesData.push(image);
								}
							});
						} 
						if(this.selectedAttendance && this.selectedAttendance.gallery_image){
							this.selectedAttendance.gallery_image.forEach(image => {
								if(image && image.src){
									this.deletedMediaFiles.push(image.src);
									this.deletMediaFilesData.push(image);
								}
							});
						}
            this.get_AttendanceData();
						this.modalService.dismissAll();
            this.router.navigate(['/attendance/view']);
          }
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_AttendanceData();
	}

	open(content,data) {
    this.selectedAttendance = data;
		if (this.selectedAttendance) {
		var mylist = { id: this.selectedAttendance._id };
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

  closeModal(){
    this.activeModal.close();
  }

}
