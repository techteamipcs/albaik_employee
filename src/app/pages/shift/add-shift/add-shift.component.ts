import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

// Services
import { ShiftService } from '../../../providers/shift/shift.service';
@Component({
	selector: 'app-add-shift',
	templateUrl: './add-shift.component.html',
	styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent {

	// Data Assign

	addShiftForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	tagtexist: any;

	// Edit Action Here
	id: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;

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
			status: ['', Validators.required],

		});
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addShiftForm.controls[controlName].hasError(errorName);
	};


	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
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
						startTime: data?.startTime,
						endTime: data?.endTime,
						breakDuration: data?.breakDuration,
						department: data?.department,
						status: data?.status,
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addShiftForm.value;
		let id = this.id;

		if (this.addShiftForm.invalid) {
			return;
		}

		if (this.isEdit) {
			this.shiftService.editShiftdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						// this.throw_msg = response.message
						// this.msg_success = true;
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
						// this.throw_msg = response.message
						// this.msg_success = true;
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
