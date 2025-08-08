import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DepartmentService } from '../../../providers/department/department.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ManagerService } from 'src/app/providers/manager/manager.service';
import { EmployeeService } from 'src/app/providers/employee/employee.service';

@Component({
	selector: 'app-add-department',
	templateUrl: './add-department.component.html',
	styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent {

	imagePath: any;
	imageArr: any = [];
	// Data Assign
	artData: any;
	countryData: any;
	adddepartmentForm: FormGroup;
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
	departmentData: any;
	managerData: any = [];
	employeeData: any = [];
	managerList: any = [];
	employeeList: any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private departmentService: DepartmentService,
		private toastr: ToastrManager,
		public managerService: ManagerService,
		public employeeService: EmployeeService
	) {
		this.adddepartmentForm = this.formBuilder.group({
			name: ['', Validators.required],
			managers: [''],
			employees: [''],
			verified: [''],
			status: ['', Validators.required],
			department_id: ['ALBKDEPT-'],
			sequence_number: [''],
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.url = environment.Url + '/assets';
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.adddepartmentForm.controls[controlName].hasError(errorName);
	};

	ngOnInit(): void {
		this.getManagerData();
		this.getEmployeeData();
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

	selectDepartment(data) {
		console.log(data);
	}

	get f() {
		return this.adddepartmentForm.controls;
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.departmentService.getDepartmentWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.departmentData = response?.result;
					let tempmanager: any = [];
          if (data?.managers) {
            data.managers.forEach((item, index) => {
              tempmanager.push({ _id: item._id, name: item.username });
            });
          }
					let tempemployee: any = [];
          if (data?.employees) {
            data.employees.forEach((item, index) => {
              tempemployee.push({ _id: item._id, name: item.username });
            });
          }
					this.adddepartmentForm.patchValue({
						name: data?.name,
						managers: tempmanager,
						employees: tempemployee,
						status: data?.status,
						department_id: data?.department_id,
						sequence_number: data?.sequence_number
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.adddepartmentForm.value;
		let id = this.id;
		obj['token'] = this.token;
		if (this.adddepartmentForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.departmentService.addDepartment(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);

						setTimeout(() => {
							this.router.navigate(['/department/view']);
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
			this.departmentService.editDepartmentdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/department/view']);
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
		this.router.navigate(['/department/view']);
	}

	getManagerData() {
		const obj = {};
		this.managerService.getallManagerDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.managerData = response.result;
						this.managerList = [];

						this.managerData.forEach((item) => {
							const manager = {
								_id: item._id,
								name: item.username,
							};
							this.managerList.push(manager);
						});
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

	getEmployeeData() {
		const obj = {};
		this.employeeService.getallEmployeeDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.employeeData = response.result;
						this.employeeList = [];

							this.employeeData.forEach((item) => {
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

				} else {
					this.toastr.errorToastr(response.message);
				}
			},
		);
	}

}
