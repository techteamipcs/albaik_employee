import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../../../providers/employee/employee.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { RoleService } from 'src/app/providers/role/role.service';

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
	managerData:any = [];
	employeeData:any = [];
	rolesData:any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private employeeService: EmployeeService,
		private toastr: ToastrManager,
		public roleService: RoleService
	) {
		this.addemployeeForm = this.formBuilder.group({
			username: ['', Validators.required],
			role: [''],
			email: [''],
  		password: [''],
			employee_id: [''],
			first_name: [''],
			last_name: [''],
			department: [''],
			certifications: [''],
  		employmentType: [''],
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
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.url = environment.Url + '/assets';
		this.get_roleData();
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
						title: data?.title,
						issuedDate: data?.issuedDate,
						expiryDate: data?.expiryDate,
						verified: data?.verified,
						status: data?.status,
						employee_id: data?.employee_id,
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addemployeeForm.value;
		let id = this.id;
		obj['token'] = this.token;
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
}
