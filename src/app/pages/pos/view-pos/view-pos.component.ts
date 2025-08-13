import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PosService } from '../../../providers/pos/pos.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-pos',
  templateUrl: './view-pos.component.html',
  styleUrls: ['./view-pos.component.scss']
})
export class ViewPosComponent {
msg_danger: boolean = false;
  PosData: any = [];
  imagePath: any;
  token: any;
  VendorData: any;
  vendorid: any = '';
  // pagination
  currentPage: number = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number = 0;
  selectedPos: any;
  closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
  deletedMediaFiles: any = [];
  deletMediaFilesData: any = [];
  constructor(
    private router: Router,
    private posService: PosService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
  ) {
    this.imagePath = environment.baseUrl + '/public/';
    this.token = localStorage.getItem('ghoastrental-token');
  }

  ngOnInit(): void {
    this.get_PosData();
    // this.get_VendorData();
  }

  get_PosData() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      token: this.token,
    };
    this.posService.getPosDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.PosData = response.result;
            this.totalRecord = response?.count;
          }
          else {
            this.msg_danger = true;
          }
        }
      },
    );
  }

  deletePos()
  {
    if (this.selectedPos) {
      var mylist = { id: this.selectedPos._id };
      mylist['token'] = this.token;
      this.posService.deletepos(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            if(this.selectedPos && this.selectedPos.image){
              this.selectedPos.image.forEach(image => {
                if(image && image.src){
                  this.deletedMediaFiles.push(image.src);
                  this.deletMediaFilesData.push(image);
                }
              });
            } 
            if(this.selectedPos && this.selectedPos.gallery_image){
              this.selectedPos.gallery_image.forEach(image => {
                if(image && image.src){
                  this.deletedMediaFiles.push(image.src);
                  this.deletMediaFilesData.push(image);
                }
              });
            }
            this.get_PosData();
            this.modalService.dismissAll();
            this.router.navigate(['/pos/view']);
          }
        },
      );
    }
  }

  onListChangePage(event: any) {
    this.currentPage = event;
    this.get_PosData();
  }

  open(content,data) {
    this.selectedPos = data;
    if (this.selectedPos) {
    var mylist = { id: this.selectedPos._id };
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
