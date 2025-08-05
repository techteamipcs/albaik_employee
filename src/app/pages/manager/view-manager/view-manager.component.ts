import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ManagerService } from '../../../providers/manager/manager.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-manager',
  templateUrl: './view-manager.component.html',
  styleUrls: ['./view-manager.component.scss']
})
export class ViewManagerComponent {
 msg_danger: boolean = false;
    ManagerData: any = [];
    imagePath: any;
    token: any;
    VendorData: any;
    vendorid: any = '';
    // pagination
    currentPage: number = 1;
    initialized: boolean = false;
    currentLimit: number = 10;
    totalRecord: number = 0;
    selectedManager: any;
    closeResult = '';
    modalReference = null;
    selectedCustomergroup : any;
    deletedMediaFiles: any = [];
    deletMediaFilesData: any = [];
    constructor(
      private router: Router,
      private managerService: ManagerService,
      private modalService: NgbModal,
      private activeModal: NgbActiveModal,
    ) {
      this.imagePath = environment.baseUrl + '/public/';
      this.token = localStorage.getItem('ghoastrental-token');
    }
  
    ngOnInit(): void {
      this.get_ManagerData();
      // this.get_VendorData();
    }
  
    get_ManagerData() {
      const obj = {
        limit: this.currentLimit,
        page: this.currentPage,
        token: this.token,
      };
      this.managerService.getManagerDetails(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            if (response.result != null && response.result != '') {
              this.ManagerData = response.result;
              this.totalRecord = response?.count;
            }
            else {
              this.msg_danger = true;
            }
          }
        },
      );
    }
  
    deleteManager()
    {
      if (this.selectedManager) {
        var mylist = { id: this.selectedManager._id };
        mylist['token'] = this.token;
        this.managerService.deletemanager(mylist).subscribe(
          (response)=> {
            if (response.code == 200)
            {
              if(this.selectedManager && this.selectedManager.image){
                this.selectedManager.image.forEach(image => {
                  if(image && image.src){
                    this.deletedMediaFiles.push(image.src);
                    this.deletMediaFilesData.push(image);
                  }
                });
              } 
              if(this.selectedManager && this.selectedManager.gallery_image){
                this.selectedManager.gallery_image.forEach(image => {
                  if(image && image.src){
                    this.deletedMediaFiles.push(image.src);
                    this.deletMediaFilesData.push(image);
                  }
                });
              }
              this.get_ManagerData();
              this.modalService.dismissAll();
              this.router.navigate(['/manager/view']);
            }
          },
        );
      }
    }
  
    onListChangePage(event: any) {
      this.currentPage = event;
      this.get_ManagerData();
    }
  
    open(content,data) {
      this.selectedManager = data;
      if (this.selectedManager) {
      var mylist = { id: this.selectedManager._id };
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
