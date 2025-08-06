import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { RoleService } from 'src/app/providers/role/role.service';
import { CertificationService } from 'src/app/providers/certification/certification.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ManagerService } from 'src/app/providers/manager/manager.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss']
})
export class AddManagerComponent {

  imagePath: any;
		imageArr: any = [];
		// Data Assign
		artData: any;
		countryData: any;
		addmanagerForm: FormGroup;
		throw_msg: any;
		submitted: boolean = false;
		msg_success: boolean = false;
		msg_danger: boolean = false;
		token: any;
		// Edit Action Here
		applyAction: any;
		id: any;
		isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
		dropdownSettings = {};
		url: any;
		managerData:any = [];
		rolesData:any = [];
		certificatesData:any = [];
		selectedcertificatesData:any = [];
		closeResult = '';
		searchText = '';
		totalRecord: number = 0;
		currentPage: number = 1;
		currentLimit: number = 10;
		certifiedObject: FormGroup;
		constructor(
			private router: Router,
			private route: ActivatedRoute,
			private formBuilder: FormBuilder,
			private toastr: ToastrManager,
			public roleService: RoleService,
			public certificationService: CertificationService,
			private modalService: NgbModal,
			public managerService: ManagerService
		) {
			this.addmanagerForm = this.formBuilder.group({
				username: ['', Validators.required],
				role: [''],
				email: [''],
				password: [''],
				manager_id: ['ALBKMNGR-'],
				first_name: [''],
				last_name: [''],
				department: [''],
				certifications: [''],
				employmentType: [''],
				file_no: [''],
				basic_orientation: [''],
				position: [''],
				hireDate: [''],
				availability: [''],
				shiftPreferences: [''],
				skills: [''],
				salary: [''],
				paymentType: [''],
				bankDetails: [''],
				address: [''],
				city: [''],
				country: [''],
				postal_code: [''],
				status:['']
			});
			this.certifiedObject = this.formBuilder.group({
				id: [''],
				title: [''],
				scored: [''],
				issuedBy: [''],
				issuedDate: [new Date()],
				validTill: [new Date()],
			});
			this.token = localStorage.getItem('ghoastrental-token');
			this.imagePath = environment.baseUrl + '/public/';
			this.url = environment.Url + '/assets';
			this.get_roleData();
			this.get_Cirtifications();
			this.getManagerData();
		}
	
		public hasError = (controlName: string, errorName: string) => {
			return this.addmanagerForm.controls[controlName].hasError(errorName);
		};
	
		ngOnInit(): void {
			this.id = this.route.snapshot.paramMap.get('id');
			if (this.isEdit) {
				this.patchingdata(this.id);
				this.applyAction = 'Update';
			}
			else {
				this.applyAction = 'Add';
			}
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
	
		onItemSelect(item: any) {
			console.log(item);
		}
	
		onSelectAll(items: any) {
			console.log(items);
		}
	
		selectManager(data) {
			console.log(data);
		}
	
		get f() {
			return this.addmanagerForm.controls;
		}
	
		patchingdata(id: any) {
			let obj = { id: id };
			this.managerService.getManagerWithId(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						let data = response?.result;
						this.managerData = response?.result;
						this.addmanagerForm.patchValue({
							username: data?.username,
							role: data?.role,
							email: data?.email,
							status: data?.status,
							manager_id: data?.manager_id,
							first_name: data?.first_name,
							last_name: data?.last_name,
							department: data?.department,
							certifications: data?.certifications,
							employmentType: data?.employmentType,
							file_no: data?.file_no,
							basic_orientation: data?.basic_orientation,
							position: data?.position,
							hireDate: moment(data?.hireDate).format('YYYY-MM-DD'),
							availability: data?.availability,
							shiftPreferences: data?.shiftPreferences,
							skills: data?.skills,
							salary: data?.salary,
							paymentType: data?.paymentType,
							bankDetails: data?.bankDetails,
							address: data?.address,
							city: data?.city,
							country: data?.country,
							postal_code: data?.postal_code,
						});
						this.selectedcertificatesData = data?.certifications;
					} else {
	
					}
				},
			);
		}
	
		onSubmit() {
			this.submitted = true;
			let obj = this.addmanagerForm.value;
			let id = this.id;
			obj['token'] = this.token;
			obj['certifications'] = this.selectedcertificatesData;
			let availability = [{
				month:'jan',
				daysAvailable:[1,2,3,4,5]
			}];
			obj['availability'] = availability;
			if (this.addmanagerForm.invalid) {
				return;
			}
			if (!this.isEdit) {
				this.managerService.addManager(obj).subscribe(
					(response) => {
						if (response.code == 200) {
							this.toastr.successToastr(response.message);
	
							setTimeout(() => {
								this.router.navigate(['/manager/view']);
							}, 2000);
						}
						else {
							this.throw_msg = response.message
							this.msg_danger = true;
							this.toastr.errorToastr(response.message);
						}
					},
				);
			}
			else {
				this.managerService.editManagerdata(obj, id).subscribe(
					(response) => {
						if (response.code == 200) {
							this.throw_msg = response.message
							this.msg_success = true;
							this.toastr.successToastr(response.message);
							setTimeout(() => {
								this.router.navigate(['/manager/view']);
							}, 2000);
						} else {
							this.throw_msg = response.message
							this.msg_danger = true;
							this.toastr.errorToastr(response.message);
						}
					},
				);
			}
		}
	
		onCancel() {
			this.router.navigate(['/manager/view']);
		}
	
		get_roleData()
		{
			const obj = {  };
			this.roleService.getallRoleDetails(obj).subscribe(
					(response)=> {
						if (response.code == 200) 
						{
							if(response.result != null && response.result != '')
							{
								this.rolesData = response.result; 
							}
							else
							{
								this.msg_danger   = true;
							}
						 
						} else {
							this.toastr.errorToastr(response.message);
						}
					},
				);
		}
	
		getManagerData()
		{
			const obj = {  };
			this.managerService.getallManagerDetails(obj).subscribe(
					(response)=> {
						if (response.code == 200) 
						{
							if(response.result != null && response.result != '')
							{
								this.managerData = response.result; 
							}
							else
							{
								this.msg_danger   = true;
							}
						 
						} else {
							this.toastr.errorToastr(response.message);
						}
					},
				);
		}
	
		get_Cirtifications()
		{
			const obj = {  };
			this.certificationService.getallCertificationDetails(obj).subscribe(
					(response)=> {
						if (response.code == 200) 
						{
							if(response.result != null && response.result != '')
							{
								this.certificatesData = response.result; 
							}
							else
							{
								this.msg_danger   = true;
							}
						 
						} else {
							this.toastr.errorToastr(response.message);
						}
					},
				);
		}
	
		openRelatedProductModal(content: any) {
			this.get_Cirtifications();
			this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl',  backdrop: 'static' })
				.result.then((result) => {
					this.closeResult = `Closed with: ${result}`;
				}, (reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				});
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
	
			onSubmitCertificate(){
				if(!this.certifiedObject.valid){
					return;
				} else {
					let title = '';
					if(this.certificatesData && this.certificatesData.length > 0){
						let temp = this.certificatesData.filter((cert) => cert._id == this.certifiedObject.value.id);
						if(temp.length > 0){
							title = temp[0].title; 
							this.certifiedObject.value['title'] = title+'-'+temp[0].type;
						}
					}
					this.selectedcertificatesData.push(this.certifiedObject.value);
					this.modalService.dismissAll();
				}
				
			}
	
			removeCertificate(index){
				this.selectedcertificatesData.splice(index, 1);
			}
}
