import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DepartmentService } from '../../../providers/department/department.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ManagerService } from 'src/app/providers/manager/manager.service';
import { EmployeeService } from 'src/app/providers/employee/employee.service';
import { MealService } from 'src/app/providers/meal/meal.service';
import { ShiftService } from 'src/app/providers/shift/shift.service';
import { RequestService } from 'src/app/providers/request/request.service';
import { PosService } from '../../../providers/pos/pos.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/providers/config/config.service';
@Component({
  selector: 'app-schedule-engine',
  templateUrl: './schedule-engine.component.html',
  styleUrls: ['./schedule-engine.component.scss']
})
export class ScheduleEngineComponent {
  imagePath: any;
  url: any;
  PosData: any = [];
  selectedPos: any;
  currentLimit: number = 10;
  totalRecord: number = 0;
  currentPage: number = 1;
  deletedMediaFiles: any = [];
  deletMediaFilesData: any = [];
  imageArr: any = [];
  currentStep = 0;
  steps = [0, 1, 2, 3, 4, 5, 6];
  modalReference = null;
  EmployeeData: any = [];
  msg_danger: boolean = false;
  shiftData: any;
  closeResult = '';
  searchText = '';
  completedSteps: boolean[] = [false, false, false, false, false, false, false];
  token: any;
  serviceRequestData: any = [];
  ConfigData: any;
  addempForm: FormGroup;
  employeeList: any = [];
  dropdownSettings = {};
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private shiftService: ShiftService,
    private toastr: ToastrManager,
    public managerService: ManagerService,
    public employeeService: EmployeeService,
    public melasService: MealService,
    public requestService: RequestService,
    private posService: PosService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private configService: ConfigService
  ) {
    this.token = localStorage.getItem('ghoastrental-token');
    this.imagePath = environment.baseUrl + '/public/';
    this.url = environment.Url + '/assets';
    this.addempForm = this.formBuilder.group({
			employees: [''],
		});
  }
  ngOnInit(): void {
    this.get_PosData();
    // this.get_VendorData();
    this.get_RequestData();
    this.get_EmployeeData();
    this.get_shiftData();
    this.get_ConfigData();
    this.dropdownSettings = {
			singleSelection: false,
			idField: '_id',
			textField: 'name',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 6,
			allowSearchFilter: true
		};
  }
  formData = {
    name: '',
    email: '',
    gender: '',
    rating: 3,
    features: {
      dashboard: false,
      reports: false,
      settings: false
    },
    comments: ''
  };

  nextStep() {
    // Mark current step as completed only if required fields are filled
    // if (this.isStepValid(this.currentStep)) {
    this.completedSteps[this.currentStep] = true;
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
    // } else {
    //   alert('Please fill in this step before continuing.');
    // }
  }
  isStepValid(step: number): boolean {
    switch (step) {
      case 0: return this.formData.name.trim() !== 'true';
      // case 2: return this.formData.email.trim() !== '';
      // case 3: return this.formData.gender.trim() !== '';
      // case 4: return !!this.formData.rating;
      // case 5: return this.formData.features.dashboard || this.formData.features.reports || this.formData.features.settings;
      // default: return true;
    }
  }

  goToStep(index: number) {
    this.currentStep = index;
  }

  onSubmitform() {
    this.completedSteps[this.currentStep] = true;
    console.log('Form submitted:', this.formData);
    alert('Form submitted successfully!');
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

  get_RequestData() {
    const obj = {};
    this.requestService.getServiceRequest(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.serviceRequestData = response.result;
          }
          else {
            this.msg_danger = true;
          }
        } else {
          this.toastr.errorToastr(response.message);
        }
      },
    );
  }

  deletePos() {
    if (this.selectedPos) {
      var mylist = { id: this.selectedPos._id };
      mylist['token'] = this.token;
      this.posService.deletepos(mylist).subscribe(
        (response) => {
          if (response.code == 200) {
            if (this.selectedPos && this.selectedPos.image) {
              this.selectedPos.image.forEach(image => {
                if (image && image.src) {
                  this.deletedMediaFiles.push(image.src);
                  this.deletMediaFilesData.push(image);
                }
              });
            }
            if (this.selectedPos && this.selectedPos.gallery_image) {
              this.selectedPos.gallery_image.forEach(image => {
                if (image && image.src) {
                  this.deletedMediaFiles.push(image.src);
                  this.deletMediaFilesData.push(image);
                }
              });
            }
            this.get_PosData();
            this.modalService.dismissAll();
            // this.router.navigate(['/pos/view']);
          }
        },
      );
    }
  }
  onListChangePage(event: any) {
    this.currentPage = event;
    this.get_PosData();
  }

  open(content, data) {
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

  closeModal() {
    this.activeModal.close();
  }
  get_EmployeeData() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      token: this.token,
    };
    this.employeeService.getallEmployeeDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.EmployeeData = response.result;
            this.totalRecord = response?.count;
            this.employeeList = [];
						this.EmployeeData.forEach((item) => {
							const employee = {
								_id: item._id,
								name: item.username,
							};
							this.employeeList.push(employee);
						});
          }
          else {
            this.msg_danger = true;
          }
        }
      },
    );
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
            this.shiftData.forEach((item) => {
							item['employees'] = [];
						});
          }
          else {
            this.msg_danger = true;
          }

        }
      },
    );
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

  get_ConfigData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      token: this.token,
    };
    this.configService.getConfigDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            if(response.result != null && response.result != '')
            {
              this.ConfigData = response.result;
              this.totalRecord = response?.count;
              this.ConfigData = this.ConfigData[0];
            }
            else
            {
              this.msg_danger   = true;
            }

          }
        },
      );
  }

  get f() {
		return this.addempForm.controls;
	}

  onItemSelect(data,shiftdata){
    // if(shiftdata){
    //   shiftdata.employees.push(data);
    // }
    let tempEmp = [];
    this.employeeList.forEach((item) => {
        let tempdata = shiftdata.employees.filter((emp)=> item._id == emp._id);
        if(tempdata.length == 0){
          tempEmp.push(item);
        }
    });
    this.employeeList = tempEmp;
  }

  onDeSelect(data,shiftdata){
    this.employeeList.push(data);
  }

  onSelectAll(data,shiftdata){
    this.employeeList = [];
  }

  onDeSelectAll(data,shiftdata){
    this.employeeList.push(data);
  }



}
