import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../../../providers/employee/employee.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { RoleService } from 'src/app/providers/role/role.service';
import { CertificationService } from 'src/app/providers/certification/certification.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ManagerService } from 'src/app/providers/manager/manager.service';
import * as moment from 'moment';
import { PositionService } from 'src/app/providers/position/position.service';
import { DepartmentService } from 'src/app/providers/department/department.service';

@Component({
	selector: 'app-add-employee',
	templateUrl: './add-employee.component.html',
	styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
	imagePath: any;
	imageArr: any = [];
	// Data Assign
	artData: any;
	countryData: any;
	addemployeeForm: FormGroup;
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
	managerData: any = [];
	employeeData: any = [];
	rolesData: any = [];
	certificatesData: any = [];
	selectedcertificatesData: any = [];
	closeResult = '';
	searchText = '';
	totalRecord: number = 0;
	currentPage: number = 1;
	currentLimit: number = 10;
	certifiedObject: FormGroup;
	positionData: any = [];
	departmentData: any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private employeeService: EmployeeService,
		private toastr: ToastrManager,
		public roleService: RoleService,
		public certificationService: CertificationService,
		private modalService: NgbModal,
		public managerService: ManagerService,
		public positionService: PositionService,
		public departmentService: DepartmentService
	) {
		this.addemployeeForm = this.formBuilder.group({
			username: ['', Validators.required],
			role: [''],
			email: [''],
			password: [''],
			employee_id: ['ALBKEMP-'],
			first_name: [''],
			last_name: [''],
			departments: [''],
			certifications: [''],
			employmentType: [''],
			file_no: [''],
			basic_orientation: [''],
			position: [''],
			hireDate: [''],
			availability: this.formBuilder.array([]), // ✅ now a FormArray
			shiftPreferences: [''],
			skills: [''],
			salary: [''],
			paymentType: [''],
			bankDetails: [''],
			address: [''],
			city: [''],
			country: [''],
			postal_code: [''],
			status: ['']
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
		this.getPositionData();
		this.getDepartmentData();
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addemployeeForm.controls[controlName].hasError(errorName);
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

	selectEmployee(data) {
		console.log(data);
	}

	get f() {
		return this.addemployeeForm.controls;
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.employeeService.getEmployeeWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.employeeData = response?.result;
					this.addemployeeForm.patchValue({
						username: data?.username,
						role: data?.role,
						email: data?.email,
						status: data?.status,
						employee_id: data?.employee_id,
						first_name: data?.first_name,
						last_name: data?.last_name,
						departments: data?.department_id,
						certifications: data?.certifications,
						employmentType: data?.employmentType,
						file_no: data?.file_no,
						basic_orientation: data?.basic_orientation,
						position: data?.position_id,
						hireDate: moment(data?.hireDate).format('YYYY-MM-DD'),
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

					// Load availability into FormArray
					if (data.availability && data.availability.length) {
						data.availability.forEach(avail => {
							this.addAvailability(avail.month, avail.daysAvailable);
						});
					}

					this.selectedcertificatesData = data?.certifications;
				}
			}
		);
	}

	get availabilityArray(): FormArray {
		return this.addemployeeForm.get('availability') as FormArray;
	}

	addAvailability(month = '', days = []) {
		this.availabilityArray.push(
			this.formBuilder.group({
				month: [month, Validators.required],
				daysAvailable: [days, Validators.required]
			})
		);
	}

	removeAvailability(index: number) {
		this.availabilityArray.removeAt(index);
	}

	onDaysChange(event: any, index: number) {
		const days = event.target.value
			.split(',')
			.map(d => parseInt(d.trim()))
			.filter(d => !isNaN(d));
		this.availabilityArray.at(index).get('daysAvailable').setValue(days);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addemployeeForm.value;
		let id = this.id;
		obj['token'] = this.token;
		obj['certifications'] = this.selectedcertificatesData;
		obj['availability'] = this.addemployeeForm.value.availability;

		// let availability = [{
		// 	month: 'jan',
		// 	daysAvailable: [1, 2, 3, 4, 5]
		// }];
		// obj['availability'] = availability;
		if (this.addemployeeForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.employeeService.addEmployee(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);

						setTimeout(() => {
							this.router.navigate(['/employee/view']);
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
			this.employeeService.editEmployeedata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/employee/view']);
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
		this.router.navigate(['/employee/view']);
	}

	get_roleData() {
		const obj = {};
		this.roleService.getallRoleDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.rolesData = response.result;
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

	getManagerData() {
		const obj = {};
		this.managerService.getallManagerDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.managerData = response.result;
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

	get_Cirtifications() {
		const obj = {};
		this.certificationService.getallCertificationDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.certificatesData = response.result;
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

	getDepartmentData() {
		const obj = {};
		this.departmentService.getallDepartmentDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.departmentData = response.result;
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

	getPositionData() {
		const obj = {};
		this.positionService.getallPositionDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.positionData = response.result;
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

	openRelatedProductModal(content: any) {
		this.get_Cirtifications();
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl', backdrop: 'static' })
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

	onSubmitCertificate() {
		if (!this.certifiedObject.valid) {
			return;
		} else {
			let title = '';
			if (this.certificatesData && this.certificatesData.length > 0) {
				let temp = this.certificatesData.filter((cert) => cert._id == this.certifiedObject.value.id);
				if (temp.length > 0) {
					title = temp[0].title;
					this.certifiedObject.value['title'] = title + '-' + temp[0].type;
				}
			}
			this.selectedcertificatesData.push(this.certifiedObject.value);
			this.modalService.dismissAll();
		}

	}

	removeCertificate(index) {
		this.selectedcertificatesData.splice(index, 1);
	}
}
