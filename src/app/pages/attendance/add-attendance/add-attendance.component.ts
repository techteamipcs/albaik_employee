import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AttendanceService } from '../../../providers/attendance/attendance.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ManagerService } from 'src/app/providers/manager/manager.service';
import { EmployeeService } from 'src/app/providers/employee/employee.service';
import * as moment from 'moment';

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
	userData:any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private attendanceService: AttendanceService,
		private toastr: ToastrManager,
		public managerService : ManagerService,
		public employeeService: EmployeeService
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
		this.getManagerData();
		this.getEmployeeData();
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
				if (response.code == 200) {
					let data = response?.result;
					this.attendanceData = response?.result;
					if(data.userType == "Employee"){
						this.userData = this.employeeData;
					} else {
						this.userData = this.managerData;
					}
					this.addattendanceForm.patchValue({
						userType: data?.userType,
						userId: data?.userId,
						date: moment(data?.date).format('YYYY-MM-DD'),
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

		getEmployeeData()
		{
			const obj = {  };
			this.employeeService.getallEmployeeDetails(obj).subscribe(
					(response)=> {
						if (response.code == 200) 
						{
							if(response.result != null && response.result != '')
							{
								this.employeeData = response.result; 
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

		onChangeUserType(event,value){
			if(value == "Employee"){
				this.userData = this.employeeData;
			} else {
				this.userData = this.managerData;
			}
		}


}
