import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { LeaverequestService } from '../../../providers/leaverequest/leaverequest.service';

@Component({
	selector: 'app-add-leaverequest',
	templateUrl: './add-leaverequest.component.html',
	styleUrls: ['./add-leaverequest.component.scss']
})
export class AddLeaverequestComponent {


	addLeaveForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	tagtexist: any;
	token: any;
	id: any;
	isEdit: boolean = false;
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	empData: any;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private leaveRequestService: LeaverequestService,
		private toastr: ToastrManager
	) {
		this.token = localStorage.getItem('albaik-admin-token');
		this.addLeaveForm = this.formBuilder.group({
			first_name: [{ value: '', disabled: true }],
			last_name: [{ value: '', disabled: true }],
			employee: [''],
			title: ['', Validators.required],
			provider: [''],
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
			status: [''],
			approved_by: [''],

		});
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addLeaveForm.controls[controlName].hasError(errorName);
	};

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		this.isEdit = !!this.id;
		this.getEmpData();
		if (this.isEdit) {
			this.patchingdata(this.id);
		}
	}

	getEmpData() {
		const obj = {};
		obj['token'] = this.token;
		this.leaveRequestService.getEmployeeDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.empData = response.result;
						this.totalRecord = response?.count;
						// ✅ Auto-fill form with employee first & last name
						this.addLeaveForm.patchValue({
							first_name: this.empData.first_name,
							last_name: this.empData.last_name,
							employee: this.empData.employee_id   // optional if you need employee ID
						});
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.leaveRequestService.getLeaveWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.addLeaveForm.patchValue({
						employee: data?.employee,
						first_name: data?.first_name,
						last_name: data?.last_name,
						title: data?.title,
						provider: data?.provider,
						startDate: data?.startDate,
						endDate: data?.endDate,
						status: data?.status,
						approved_by: data?.approved_by,
					});
				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;

		if (this.addLeaveForm.invalid) {
			return;
		}

		let obj = this.addLeaveForm.value;
		let id = this.id;
		obj['token'] = this.token;
		if (this.isEdit) {
			this.leaveRequestService.editLeavedata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/leaverequest/view']);
						}, 2000);
					} else {
						this.toastr.errorToastr(response.message);
					}
				},
			);
		} else {
			this.leaveRequestService.addLeavedata(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/leaverequest/view']);
						}, 2000);
					} else {
						this.toastr.errorToastr(response.message);
					}
				},
			);
		}
	}

	onCancel() {
		this.router.navigate(['/leaverequest/view']);
	}

}
