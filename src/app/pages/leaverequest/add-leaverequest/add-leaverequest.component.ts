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
export class AddLeaverequestComponent implements OnInit {

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
	showTimeFields: boolean = false;
	calculatedDuration: string = '';

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
			startTime: [''],
			endTime: [''],
			leaveType: ['full'], // Default to full day
			status: [''],
			approved_by: [''],
		});

		// Watch for changes in dates and times to calculate duration
		this.addLeaveForm.valueChanges.subscribe(() => {
			this.calculateDuration();
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

					// Determine leave type based on existing data
					let leaveType = 'full';
					if (data?.startTime || data?.endTime) {
						leaveType = 'custom';
						this.showTimeFields = true;
						this.updateTimeValidators(true);
					}

					// Format dates for input fields
					const startDate = data?.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '';
					const endDate = data?.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '';

					this.addLeaveForm.patchValue({
						employee: data?.employee,
						first_name: data?.employee_data?.[0]?.first_name || data?.first_name,
						last_name: data?.employee_data?.[0]?.last_name || data?.last_name,
						title: data?.title,
						provider: data?.provider,
						startDate: startDate,
						endDate: endDate,
						startTime: data?.startTime,
						endTime: data?.endTime,
						leaveType: leaveType,
						status: data?.status,
						approved_by: data?.approved_by,
					});
				}
			},
		);
	}

	onLeaveTypeChange(event: any) {
		const leaveType = event.target.value;

		switch (leaveType) {
			case 'full':
				this.showTimeFields = false;
				this.updateTimeValidators(false);
				this.addLeaveForm.patchValue({
					startTime: '',
					endTime: ''
				});
				break;
			case 'half':
				this.showTimeFields = true;
				this.updateTimeValidators(true);
				// Set default half day times
				this.addLeaveForm.patchValue({
					startTime: '09:00',
					endTime: '13:00'
				});
				break;
			case 'custom':
				this.showTimeFields = true;
				this.updateTimeValidators(true);
				this.addLeaveForm.patchValue({
					startTime: '',
					endTime: ''
				});
				break;
		}
	}

	updateTimeValidators(required: boolean) {
		const startTimeControl = this.addLeaveForm.get('startTime');
		const endTimeControl = this.addLeaveForm.get('endTime');

		if (required) {
			startTimeControl?.setValidators([Validators.required, this.timeFormatValidator]);
			endTimeControl?.setValidators([Validators.required, this.timeFormatValidator]);
		} else {
			startTimeControl?.clearValidators();
			endTimeControl?.clearValidators();
		}

		startTimeControl?.updateValueAndValidity();
		endTimeControl?.updateValueAndValidity();
	}

	timeFormatValidator(control: AbstractControl): { [key: string]: any } | null {
		const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
		if (control.value && !timeRegex.test(control.value)) {
			return { 'invalidTimeFormat': true };
		}
		return null;
	}

	calculateDuration() {
		const formValue = this.addLeaveForm.value;
		const startDate = new Date(formValue.startDate);
		const endDate = new Date(formValue.endDate);

		if (!formValue.startDate || !formValue.endDate) {
			this.calculatedDuration = '';
			return;
		}

		// Calculate days
		const timeDiff = endDate.getTime() - startDate.getTime();
		const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

		if (this.showTimeFields && formValue.startTime && formValue.endTime) {
			// Calculate hours for single day with time
			if (daysDiff === 1) {
				const startTime = this.parseTime(formValue.startTime);
				const endTime = this.parseTime(formValue.endTime);

				if (startTime && endTime) {
					const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
					this.calculatedDuration = `${hours.toFixed(1)} hours`;
				}
			} else {
				this.calculatedDuration = `${daysDiff} days (with custom times)`;
			}
		} else {
			this.calculatedDuration = daysDiff === 1 ? '1 day' : `${daysDiff} days`;
		}
	}

	parseTime(timeString: string): Date | null {
		if (!timeString) return null;
		const [hours, minutes] = timeString.split(':').map(num => parseInt(num, 10));
		const date = new Date();
		date.setHours(hours, minutes, 0, 0);
		return date;
	}

	onSubmit() {
		this.submitted = true;

		// Additional validation for time fields
		if (this.showTimeFields) {
			const startTime = this.addLeaveForm.get('startTime')?.value;
			const endTime = this.addLeaveForm.get('endTime')?.value;

			if (startTime && endTime && startTime >= endTime) {
				this.toastr.errorToastr('End time must be after start time');
				return;
			}
		}

		if (this.addLeaveForm.invalid) {
			// Mark all fields as touched to show validation errors
			Object.keys(this.addLeaveForm.controls).forEach(key => {
				this.addLeaveForm.get(key)?.markAsTouched();
			});
			return;
		}

		let obj = this.addLeaveForm.value;
		let id = this.id;
		obj['token'] = this.token;

		// Remove leaveType from submission as it's just for UI
		delete obj.leaveType;

		// Clear time fields if not using them
		if (!this.showTimeFields) {
			obj.startTime = null;
			obj.endTime = null;
		}

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
				(error) => {
					this.toastr.errorToastr('Failed to update leave request');
				}
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
				(error) => {
					this.toastr.errorToastr('Failed to create leave request');
				}
			);
		}
	}

	onCancel() {
		this.router.navigate(['/leaverequest/view']);
	}
}
