import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AttendanceService } from '../../../providers/attendance/attendance.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss']
})
export class AddAttendanceComponent {
  imagePath: any;
	imageArr: any = [];
	// Data Assign
	artData: any;
	countryData: any;
	addattendanceForm: FormGroup;
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
	attendanceData: any;
	managerData:any = [];
	employeeData:any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private attendanceService: AttendanceService,
		private toastr: ToastrManager,
	) {
		this.addattendanceForm = this.formBuilder.group({
			userType: ['', Validators.required],
			userId: ['', Validators.required],			
			date: ['', Validators.required],
			checkIn: [''],			
			checkOut: [''],
			status: ['', Validators.required],
			reason: [''],
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.url = environment.Url + '/assets';
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addattendanceForm.controls[controlName].hasError(errorName);
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

	selectAttendance(data) {
		console.log(data);
	}

	get f() {
		return this.addattendanceForm.controls;
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.attendanceService.getAttendanceWithId(obj).subscribe(
			(response) => {
				if (response.code == 200 && response?.result.length > 0) {
					let data = response?.result[0];
					this.attendanceData = response?.result[0];
					this.addattendanceForm.patchValue({
						userType: data?.userType,
						userId: data?.userId,
						date: data?.date,
						checkIn: data?.checkIn,
						checkOut: data?.checkOut,	
						status: data?.status,
						reason: data?.reason
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addattendanceForm.value;
		let id = this.id;
		obj['token'] = this.token;
		if (this.addattendanceForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.attendanceService.addAttendance(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);

						setTimeout(() => {
							this.router.navigate(['/attendance/view']);
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
			this.attendanceService.editAttendancedata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/attendance/view']);
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
		this.router.navigate(['/attendance/view']);
	}
}
