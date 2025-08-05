import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { ShiftService } from '../../../providers/shift/shift.service';

@Component({
	selector: 'app-add-shift',
	templateUrl: './add-shift.component.html',
	styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent implements OnInit {

	addShiftForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	tagtexist: any;

	id: any;
	isEdit: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private shiftService: ShiftService,
		private toastr: ToastrManager
	) {
		this.addShiftForm = this.formBuilder.group({
			name: ['', Validators.required],
			startTime: ['', Validators.required],
			endTime: ['', Validators.required],
			breakDuration: ['', Validators.required],
			department: ['', Validators.required],
			status: [true],
		}, {
			validators: [this.startBeforeEndValidator]
		});
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addShiftForm.controls[controlName].hasError(errorName);
	};

	startBeforeEndValidator(group: AbstractControl): { [key: string]: boolean } | null {
		const start = group.get('startTime')?.value;
		const end = group.get('endTime')?.value;
		if (start && end && start >= end) {
			return { startAfterEnd: true };
		}
		return null;
	}

	formatTimeToAmPm(time: string): string {
		if (!time) return '';
		const [hourStr, minute] = time.split(':');
		let hour = parseInt(hourStr, 10);
		const ampm = hour >= 12 ? 'PM' : 'AM';
		hour = hour % 12 || 12;
		return `${hour}:${minute} ${ampm}`;
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		this.isEdit = !!this.id;

		if (this.isEdit) {
			this.patchingdata(this.id);
		}
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.shiftService.getShiftWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.addShiftForm.patchValue({
						name: data?.name,
						startTime: data?.startTime?.substring(0, 5),
						endTime: data?.endTime?.substring(0, 5),
						breakDuration: data?.breakDuration,
						department: data?.department,
						status: data?.status === true || data?.status === 'active'
					});
				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;

		if (this.addShiftForm.invalid) {
			return;
		}

		let obj = this.addShiftForm.value;
		// obj.startTime = this.formatTimeToAmPm(obj.startTime);
		// obj.endTime = this.formatTimeToAmPm(obj.endTime);
		let id = this.id;

		if (this.isEdit) {
			this.shiftService.editShiftdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/shift/view']);
						}, 2000);
					} else {
						this.toastr.errorToastr(response.message);
					}
				},
			);
		} else {
			this.shiftService.addShiftdata(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/shift/view']);
						}, 2000);
					} else {
						this.toastr.errorToastr(response.message);
					}
				},
			);
		}
	}

	onCancel() {
		this.router.navigate(['/shift/view']);
	}
}
