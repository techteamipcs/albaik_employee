import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PosService } from '../../../providers/pos/pos.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';

@Component({
  selector: 'app-add-pos',
  templateUrl: './add-pos.component.html',
  styleUrls: ['./add-pos.component.scss']
})
export class AddPosComponent {
imagePath: any;
	imageArr: any = [];
	// Data Assign
	artData: any;
	countryData: any;
	addposForm: FormGroup;
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
	posData: any;
	managerData:any = [];
	employeeData:any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private posService: PosService,
		private toastr: ToastrManager,
	) {
		this.addposForm = this.formBuilder.group({
			date: ['', Validators.required],
			location: [''],
			hours: [''],
			orders: [''],
			sales: [''],
			avarage_order_value: [''],
			ispeakhour: [''],
			chef_count: [''],
			cashier_count: [''],
			server_count: [''],
			packer_count: [''],
			status: ['', Validators.required],
			sequence_number: [''],
		});
		this.token = localStorage.getItem('albaik-admin-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.url = environment.Url + '/assets';
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addposForm.controls[controlName].hasError(errorName);
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

	selectPos(data) {
		console.log(data);
	}

	get f() {
		return this.addposForm.controls;
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.posService.getPosWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.posData = response?.result;
					this.addposForm.patchValue({
						date: moment(data?.date).format('YYYY-MM-DD'),
						location: data?.location,
						hours: data?.hours,
						orders: data?.orders,
						sales: data?.sales,
						avarage_order_value: data?.avarage_order_value,
						ispeakhour: data?.ispeakhour,
						chef_count: data?.chef_count,
						cashier_count: data?.cashier_count,
						server_count: data?.server_count,
						packer_count: data?.packer_count,
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
		let obj = this.addposForm.value;
		let id = this.id;
		obj['token'] = this.token;
		if (this.addposForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.posService.addPos(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);

						setTimeout(() => {
							this.router.navigate(['/pos/view']);
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
			this.posService.editPosdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/pos/view']);
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
		this.router.navigate(['/pos/view']);
	}
}
