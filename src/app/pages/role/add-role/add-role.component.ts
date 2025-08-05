import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RoleService } from '../../../providers/role/role.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {
  imagePath: any;
	imageArr: any = [];
	// Data Assign
	artData: any;
	countryData: any;
	addroleForm: FormGroup;
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
	roleData: any;
	managerData:any = [];
	employeeData:any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private roleService: RoleService,
		private toastr: ToastrManager,
	) {
		this.addroleForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: ['', Validators.required],
			sequence_number: [''],
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.url = environment.Url + '/assets';
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addroleForm.controls[controlName].hasError(errorName);
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

	selectRole(data) {
		console.log(data);
	}

	get f() {
		return this.addroleForm.controls;
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.roleService.getRoleWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.roleData = response?.result;
					this.addroleForm.patchValue({
						name: data?.name,
						sequence_number: data?.sequence_number,
						status: data?.status
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addroleForm.value;
		let id = this.id;
		obj['token'] = this.token;
		if (this.addroleForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.roleService.addRole(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);

						setTimeout(() => {
							this.router.navigate(['/role/view']);
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
			this.roleService.editRoledata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/role/view']);
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
		this.router.navigate(['/role/view']);
	}
}
