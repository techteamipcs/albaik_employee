import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RoleService } from '../../../providers/role/role.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent {
  msg_danger: boolean = false;
	RoleData: any = [];
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';
	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedRole: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	deletedMediaFiles: any = [];
	deletMediaFilesData: any = [];
	constructor(
		private router: Router,
		private roleService: RoleService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('albaik-admin-token');
	}

	ngOnInit(): void {
		this.get_RoleData();
		// this.get_VendorData();
	}

	get_RoleData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.roleService.getRoleDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.RoleData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}
				}
			},
		);
	}

	deleteRole()
  {
    if (this.selectedRole) {
			var mylist = { id: this.selectedRole._id };
			mylist['token'] = this.token;
      this.roleService.deleterole(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
						if(this.selectedRole && this.selectedRole.image){
							this.selectedRole.image.forEach(image => {
								if(image && image.src){
									this.deletedMediaFiles.push(image.src);
									this.deletMediaFilesData.push(image);
								}
							});
						}
						if(this.selectedRole && this.selectedRole.gallery_image){
							this.selectedRole.gallery_image.forEach(image => {
								if(image && image.src){
									this.deletedMediaFiles.push(image.src);
									this.deletMediaFilesData.push(image);
								}
							});
						}
            this.get_RoleData();
						this.modalService.dismissAll();
            this.router.navigate(['/role/view']);
          }
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_RoleData();
	}

	open(content,data) {
    this.selectedRole = data;
		if (this.selectedRole) {
		var mylist = { id: this.selectedRole._id };
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
