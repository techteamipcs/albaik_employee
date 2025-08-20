import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DepartmentService } from '../../../providers/department/department.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.scss']
})
export class ViewDepartmentComponent {

  msg_danger: boolean = false;
    DepartmentData: any = [];
    imagePath: any;
    token: any;
    VendorData: any;
    vendorid: any = '';
    // pagination
    currentPage: number = 1;
    initialized: boolean = false;
    currentLimit: number = 10;
    totalRecord: number = 0;
    selectedDepartment: any;
    closeResult = '';
    modalReference = null;
    selectedCustomergroup : any;
    deletedMediaFiles: any = [];
    deletMediaFilesData: any = [];
    constructor(
      private router: Router,
      private departmentService: DepartmentService,
      private modalService: NgbModal,
      private activeModal: NgbActiveModal,
    ) {
      this.imagePath = environment.baseUrl + '/public/';
      this.token = localStorage.getItem('albaik-admin-token');
    }

    ngOnInit(): void {
      this.get_DepartmentData();
      // this.get_VendorData();
    }

    get_DepartmentData() {
      const obj = {
        limit: this.currentLimit,
        page: this.currentPage,
        token: this.token,
      };
      this.departmentService.getDepartmentDetails(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            if (response.result != null && response.result != '') {
              this.DepartmentData = response.result;
              this.totalRecord = response?.count;
            }
            else {
              this.msg_danger = true;
            }
          }
        },
      );
    }

    deleteDepartment()
    {
      if (this.selectedDepartment) {
        var mylist = { id: this.selectedDepartment._id };
        mylist['token'] = this.token;
        this.departmentService.deletedepartment(mylist).subscribe(
          (response)=> {
            if (response.code == 200)
            {
              if(this.selectedDepartment && this.selectedDepartment.image){
                this.selectedDepartment.image.forEach(image => {
                  if(image && image.src){
                    this.deletedMediaFiles.push(image.src);
                    this.deletMediaFilesData.push(image);
                  }
                });
              }
              if(this.selectedDepartment && this.selectedDepartment.gallery_image){
                this.selectedDepartment.gallery_image.forEach(image => {
                  if(image && image.src){
                    this.deletedMediaFiles.push(image.src);
                    this.deletMediaFilesData.push(image);
                  }
                });
              }
              this.get_DepartmentData();
              this.modalService.dismissAll();
              this.router.navigate(['/department/view']);
            }
          },
        );
      }
    }

    onListChangePage(event: any) {
      this.currentPage = event;
      this.get_DepartmentData();
    }

    open(content,data) {
      this.selectedDepartment = data;
      if (this.selectedDepartment) {
      var mylist = { id: this.selectedDepartment._id };
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
