import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DepartmentService } from '../../../providers/department/department.service';
import { ToastrManager } from 'ng6-toastr-notifications';

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
	managerData:any = [];
	employeeData:any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private departmentService: DepartmentService,
		private toastr: ToastrManager,
	) {
		this.adddepartmentForm = this.formBuilder.group({
			title: ['', Validators.required],
			issuedDate: [''],
			expiryDate: [''],
  		verified: [''],
			status: ['', Validators.required],
			department_id: [''],
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.url = environment.Url + '/assets';
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.adddepartmentForm.controls[controlName].hasError(errorName);
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
					this.adddepartmentForm.patchValue({
						title: data?.title,
						issuedDate: data?.issuedDate,
						expiryDate: data?.expiryDate,
						verified: data?.verified,
						status: data?.status,
						department_id: data?.department_id,
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
  
}
