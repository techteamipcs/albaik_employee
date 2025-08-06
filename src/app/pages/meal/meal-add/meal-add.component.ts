import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ToastrManager } from 'ng6-toastr-notifications';
import { RoleService } from 'src/app/providers/role/role.service';
import { MealService } from 'src/app/providers/meal/meal.service';

@Component({
	selector: 'app-meal-add',
	templateUrl: './meal-add.component.html',
	styleUrls: ['./meal-add.component.scss']
})
export class MealAddComponent {

	imagePath: any;
	imageArr: any = [];
	// Data Assign
	addmealForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;
	// Edit Action Here
	applyAction: any;
	id: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
	url: any;
	mealData: any = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private mealService: MealService,
		private toastr: ToastrManager,

	) {
		this.addmealForm = this.formBuilder.group({
			name: ['', Validators.required],
			description: [''],
			category: [''],
			ingredients: [''],
			preparationTime: [''],
			price: [''],
			isAvailable: ['',Validators.required],
			requiredEmployees: ['']
		});
		this.token = localStorage.getItem('albaik-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.url = environment.Url + '/assets';
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addmealForm.controls[controlName].hasError(errorName);
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
	}

	get f() {
		return this.addmealForm.controls;
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.mealService.getMealWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.mealData = response?.result;
					this.addmealForm.patchValue({
						name: data?.name,
						description: data?.description,
						category: data?.category,
						ingredients: data?.ingredients,
						preparationTime: data?.preparationTime,
						price: data?.price,
						isAvailable: data?.isAvailable,
						requiredEmployees: data?.requiredEmployees,
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addmealForm.value;
		let id = this.id;
		obj['token'] = this.token;
		if (this.addmealForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.mealService.addMeal(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);

						setTimeout(() => {
							this.router.navigate(['/meal/view']);
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
			this.mealService.editMealdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/meal/view']);
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
		this.router.navigate(['/meal/view']);
	}

}
