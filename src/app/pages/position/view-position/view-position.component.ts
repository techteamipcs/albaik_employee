import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PositionService } from '../../../providers/position/position.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-position',
  templateUrl: './view-position.component.html',
  styleUrls: ['./view-position.component.scss']
})
export class ViewPositionComponent {
  msg_danger: boolean = false;
	PositionData: any = [];
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';
	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedPosition: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	deletedMediaFiles: any = [];
	deletMediaFilesData: any = [];
	constructor(
		private router: Router,
		private positionService: PositionService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('albaik-admin-token');
	}

	ngOnInit(): void {
		this.get_PositionData();
		// this.get_VendorData();
	}

	get_PositionData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.positionService.getPositionDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.PositionData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}
				}
			},
		);
	}

	deletePosition()
  {
    if (this.selectedPosition) {
			var mylist = { id: this.selectedPosition._id };
			mylist['token'] = this.token;
      this.positionService.deleteposition(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
						if(this.selectedPosition && this.selectedPosition.image){
							this.selectedPosition.image.forEach(image => {
								if(image && image.src){
									this.deletedMediaFiles.push(image.src);
									this.deletMediaFilesData.push(image);
								}
							});
						}
						if(this.selectedPosition && this.selectedPosition.gallery_image){
							this.selectedPosition.gallery_image.forEach(image => {
								if(image && image.src){
									this.deletedMediaFiles.push(image.src);
									this.deletMediaFilesData.push(image);
								}
							});
						}
            this.get_PositionData();
						this.modalService.dismissAll();
            this.router.navigate(['/position/view']);
          }
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_PositionData();
	}

	open(content,data) {
    this.selectedPosition = data;
		if (this.selectedPosition) {
		var mylist = { id: this.selectedPosition._id };
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
