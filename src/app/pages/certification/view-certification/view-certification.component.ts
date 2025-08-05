import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CertificationService } from '../../../providers/certification/certification.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-certification',
  templateUrl: './view-certification.component.html',
  styleUrls: ['./view-certification.component.scss']
})
export class ViewCertificationComponent {

  msg_danger: boolean = false;
    CertificationData: any = [];
    imagePath: any;
    token: any;
    VendorData: any;
    vendorid: any = '';
    // pagination
    currentPage: number = 1;
    initialized: boolean = false;
    currentLimit: number = 10;
    totalRecord: number = 0;
    selectedCertification: any;
    closeResult = '';
    modalReference = null;
    selectedCustomergroup : any;
    deletedMediaFiles: any = [];
    deletMediaFilesData: any = [];
    constructor(
      private router: Router,
      private certificationService: CertificationService,
      private modalService: NgbModal,
      private activeModal: NgbActiveModal,
    ) {
      this.imagePath = environment.baseUrl + '/public/';
      this.token = localStorage.getItem('ghoastrental-token');
    }
  
    ngOnInit(): void {
      this.get_CertificationData();
      // this.get_VendorData();
    }
  
    get_CertificationData() {
      const obj = {
        limit: this.currentLimit,
        page: this.currentPage,
        token: this.token,
      };
      this.certificationService.getCertificationDetails(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            if (response.result != null && response.result != '') {
              this.CertificationData = response.result;
              this.totalRecord = response?.count;
            }
            else {
              this.msg_danger = true;
            }
          }
        },
      );
    }
  
    deleteCertification()
    {
      if (this.selectedCertification) {
        var mylist = { id: this.selectedCertification._id };
        mylist['token'] = this.token;
        this.certificationService.deletecertification(mylist).subscribe(
          (response)=> {
            if (response.code == 200)
            {
              if(this.selectedCertification && this.selectedCertification.image){
                this.selectedCertification.image.forEach(image => {
                  if(image && image.src){
                    this.deletedMediaFiles.push(image.src);
                    this.deletMediaFilesData.push(image);
                  }
                });
              } 
              if(this.selectedCertification && this.selectedCertification.gallery_image){
                this.selectedCertification.gallery_image.forEach(image => {
                  if(image && image.src){
                    this.deletedMediaFiles.push(image.src);
                    this.deletMediaFilesData.push(image);
                  }
                });
              }
              this.get_CertificationData();
              this.modalService.dismissAll();
              this.router.navigate(['/certification/view']);
            }
          },
        );
      }
    }
  
    onListChangePage(event: any) {
      this.currentPage = event;
      this.get_CertificationData();
    }
  
    open(content,data) {
      this.selectedCertification = data;
      if (this.selectedCertification) {
      var mylist = { id: this.selectedCertification._id };
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
