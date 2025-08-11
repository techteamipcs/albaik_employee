import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ToastrManager } from 'ng6-toastr-notifications';
import { RoleService } from 'src/app/providers/role/role.service';
import { MealService } from 'src/app/providers/meal/meal.service';
import { EmployeeService } from 'src/app/providers/employee/employee.service';
import { DepartmentService } from 'src/app/providers/department/department.service';
import { PositionService } from 'src/app/providers/position/position.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'app-meal-add',
	templateUrl: './meal-add.component.html',
	styleUrls: ['./meal-add.component.scss']
})
export class MealAddComponent implements OnInit {
	imagePath: any;
	// Data Assign
	addmealForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;
	applyAction: any;
	id: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
	url: any;
	mealData: any = [];
	employeeList: any = [];
	employeeData: any = [];
	positionData: any = [];
	closeResult = '';
	totalRecord: number = 0;
	currentPage: number = 1;
	currentLimit: number = 10;
	// Ingredients list for the dropdown
	ingredientsList: string[] = [
		'Chickpeas', 'Onions', 'Garlic', 'Parsley', 'Cilantro',
		'Cumin', 'Coriander', 'Chicken', 'Spices', 'Marinade',
		'Coating', 'Frying', 'Breadcrumbs', 'Garlic powder',
		'Black pepper powder', 'Salt', 'Oil'
	];
	dropdownSettings = {};
	departmentData: any = [];
	departmentList: any = [];
	deptObject: FormGroup;
	selectedDeptData: any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private mealService: MealService,
		private toastr: ToastrManager,
		public departmentService: DepartmentService,
		public employeeService: EmployeeService,
		public positionService: PositionService,
		private modalService: NgbModal,
	) {
		this.addmealForm = this.formBuilder.group({
			name: ['', Validators.required],
			description: [''],
			category: [''],
			ingredients: [[], Validators.required], // now a multi-select control
			preparationTime: [''],
			price: [''],
			employees: [''],
			departments: [''],
			meal_id: ['ALBKMEAL-'],
			isAvailable: ['', Validators.required],
			requiredEmployees: [''],
			package: [''],
			machine: [''],
			sequence_number: ['']

		});
		this.deptObject = this.formBuilder.group({
			id: [''],
			department: [''],
			position: [''],
			employeesPerOrder: [''],
		});
		this.token = localStorage.getItem('albaik-admin-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.url = environment.Url + '/assets';
	}

	ngOnInit(): void {
		this.getEmployeeData();
		this.getDepartmentData();
		this.getPositionData();
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.isEdit) {
			this.patchingdata(this.id);
			this.applyAction = 'Update';
		} else {
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

	get f() {
		return this.addmealForm.controls;
	}

	hasError(controlName: string, errorName: string): boolean {
		return this.addmealForm.controls[controlName].hasError(errorName);
	}

	patchingdata(id: any): void {
		let obj = { id: id };
		this.mealService.getMealWithId(obj).subscribe((response) => {
			if (response.code === 200) {
				let data = response.result;
				this.mealData = data;

				let tempemployee: any = [];
				if (data?.employees) {
					data.employees.forEach((item, index) => {
						tempemployee.push({
							_id: item._id,
							name: item.username
						});
					});
				}

				let tempDept: any = [];
				if (data?.departments_data) {
					data.departments_data.forEach((item, index) => {
						tempDept.push({
							_id: item._id,
							name: item.name
						});
					});
				}
				if(data?.department_needs){
					this.selectedDeptData = data?.department_needs;
				}
				// Patch values to form
				this.addmealForm.patchValue({
					name: data.name,
					description: data.description,
					category: data.category,
					preparationTime: data.preparationTime,
					price: data.price,
					isAvailable: data.isAvailable,
					requiredEmployees: data.requiredEmployees,
					ingredients: data.ingredients || [],
					employees: tempemployee,
					sequence_number: data?.sequence_number,
					departments: tempDept,
					meal_id: data?.meal_id,
					machine: data?.machine,
					package: data?.package,
				});
				
			} else {

			}
		});
	}

	onSubmit(): void {
		this.submitted = true;
		const obj = this.addmealForm.value;
		obj['token'] = this.token;
		obj['department_needs'] = this.selectedDeptData;
		if (this.addmealForm.invalid) {
			return;
		}

		if (!this.isEdit) {
			this.mealService.addMeal(obj).subscribe((response) => {
				if (response.code === 200) {
					this.toastr.successToastr(response.message);
					setTimeout(() => {
						this.router.navigate(['/meal/view']);
					}, 2000);
				} else {
					this.throw_msg = response.message;
					this.msg_danger = true;
					this.toastr.errorToastr(response.message);
				}
			});
		} else {
			this.mealService.editMealdata(obj, this.id).subscribe((response) => {
				if (response.code === 200) {
					this.throw_msg = response.message;
					this.msg_success = true;
					this.toastr.successToastr(response.message);
					setTimeout(() => {
						this.router.navigate(['/meal/view']);
					}, 2000);
				} else {
					this.throw_msg = response.message;
					this.msg_danger = true;
					this.toastr.errorToastr(response.message);
				}
			});
		}
	}

	getEmployeeData() {
		const obj = {};
		this.employeeService.getallEmployeeDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.employeeData = response.result;
						this.employeeList = [];

						this.employeeData.forEach((item) => {
							const employee = {
								_id: item._id,
								name: item.username,
							};
							this.employeeList.push(employee);
						});
					}
					else {
						this.msg_danger = true;
					}

				} else {
					this.toastr.errorToastr(response.message);
				}
			},
		);
	}

	getDepartmentData() {
		const obj = {};
		this.departmentService.getallDepartmentDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.departmentData = response.result;
						this.departmentList = [];

						this.departmentData.forEach((item) => {
							const department = {
								_id: item._id,
								name: item.name,
							};
							this.departmentList.push(department);
						});
					}
					else {
						this.msg_danger = true;
					}

				} else {
					this.toastr.errorToastr(response.message);
				}
			},
		);
	}

	// getDepartment() {
	// 	const obj = {};
	// 	this.departmentService.getallDepartmentDetails(obj).subscribe(
	// 		(response) => {
	// 			if (response.code == 200) {
	// 				if (response.result != null && response.result != '') {
	// 					this.departmentData = response.result;
	// 				}
	// 				else {
	// 					this.msg_danger = true;
	// 				}

	// 			} else {
	// 				this.toastr.errorToastr(response.message);
	// 			}
	// 		},
	// 	);
	// }



	getPositionData() {
		const obj = {};
		this.positionService.getallPositionDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.positionData = response.result;
					}
					else {
						this.msg_danger = true;
					}

				} else {
					this.toastr.errorToastr(response.message);
				}
			},
		);
	}

	openModal(content: any) {
		this.getDepartmentData();
		this.getPositionData();
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl', backdrop: 'static' })
			.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	onSubmitDept() {
		if (!this.deptObject.valid) {
			return;
		}

		// Find matching department title if needed
		let title = '';
		const deptId = this.deptObject.value.id;

		if (Array.isArray(this.departmentData) && this.departmentData.length > 0) {
			const match = this.departmentData.find((dept) => dept._id === deptId);
			if (match) {
				title = match.name;
				this.deptObject.patchValue({
					title: `${title}-${match.type || ''}`
				});
			}
		}

		this.selectedDeptData.push(this.deptObject.value);
		this.modalService.dismissAll();
	}


	removeDept(index) {
		this.selectedDeptData.splice(index, 1);
	}

	onCancel(): void {
		this.router.navigate(['/meal/view']);
	}
}
