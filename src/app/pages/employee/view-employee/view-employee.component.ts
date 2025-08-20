import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../../../providers/employee/employee.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {
 msg_danger: boolean = false;
    EmployeeData: any = [];
    imagePath: any;
    token: any;
    VendorData: any;
    vendorid: any = '';
    // pagination
    currentPage: number = 1;
    initialized: boolean = false;
    currentLimit: number = 10;
    totalRecord: number = 0;
    selectedEmployee: any;
    closeResult = '';
    modalReference = null;
    selectedCustomergroup : any;
    deletedMediaFiles: any = [];
    deletMediaFilesData: any = [];
    constructor(
      private router: Router,
      private employeeService: EmployeeService,
      private modalService: NgbModal,
      private activeModal: NgbActiveModal,
    ) {
      this.imagePath = environment.baseUrl + '/public/';
      this.token = localStorage.getItem('albaik-admin-token');
    }

    ngOnInit(): void {
      this.get_EmployeeData();
      // this.get_VendorData();
    }

    get_EmployeeData() {
      const obj = {
        limit: this.currentLimit,
        page: this.currentPage,
        token: this.token,
      };
      this.employeeService.getEmployeeDetails(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            if (response.result != null && response.result != '') {
              this.EmployeeData = response.result;
              this.totalRecord = response?.count;
            }
            else {
              this.msg_danger = true;
            }
          }
        },
      );
    }

    deleteEmployee()
    {
      if (this.selectedEmployee) {
        var mylist = { id: this.selectedEmployee._id };
        mylist['token'] = this.token;
        this.employeeService.deleteemployee(mylist).subscribe(
          (response)=> {
            if (response.code == 200)
            {
              if(this.selectedEmployee && this.selectedEmployee.image){
                this.selectedEmployee.image.forEach(image => {
                  if(image && image.src){
                    this.deletedMediaFiles.push(image.src);
                    this.deletMediaFilesData.push(image);
                  }
                });
              }
              if(this.selectedEmployee && this.selectedEmployee.gallery_image){
                this.selectedEmployee.gallery_image.forEach(image => {
                  if(image && image.src){
                    this.deletedMediaFiles.push(image.src);
                    this.deletMediaFilesData.push(image);
                  }
                });
              }
              this.get_EmployeeData();
              this.modalService.dismissAll();
              this.router.navigate(['/employee/view']);
            }
          },
        );
      }
    }

    onListChangePage(event: any) {
      this.currentPage = event;
      this.get_EmployeeData();
    }

    open(content,data) {
      this.selectedEmployee = data;
      if (this.selectedEmployee) {
      var mylist = { id: this.selectedEmployee._id };
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
