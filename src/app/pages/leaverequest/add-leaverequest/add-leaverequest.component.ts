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

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private leaveRequestService: LeaverequestService,
		private toastr: ToastrManager
	) {
		this.token = localStorage.getItem('albaik-admin-token');
		this.addLeaveForm = this.formBuilder.group({
			employee: ['', Validators.required],
			title: ['', Validators.required],
			provider: ['', Validators.required],
			issuedDate: ['', Validators.required],
			expiryDate: ['', Validators.required],
			approved: ['', Validators.required],
			approved_by: ['', Validators.required],

		});
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addLeaveForm.controls[controlName].hasError(errorName);
	};

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		this.isEdit = !!this.id;

		if (this.isEdit) {
			this.patchingdata(this.id);
		}
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.leaveRequestService.getLeaveWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.addLeaveForm.patchValue({
						employee: data?.employee,
						title: data?.title,
						provider: data?.provider,
						issuedDate: data?.issuedDate,
						expiryDate: data?.expiryDate,
						approved: data?.approved,
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
