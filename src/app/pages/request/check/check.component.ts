import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DepartmentService } from '../../../providers/department/department.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ManagerService } from 'src/app/providers/manager/manager.service';
import { EmployeeService } from 'src/app/providers/employee/employee.service';
import { MealService } from 'src/app/providers/meal/meal.service';
import { ShiftService } from 'src/app/providers/shift/shift.service';
import { RequestService } from 'src/app/providers/request/request.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent {
  imagePath: any;
	imageArr: any = [];
	// Data Assign
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	isEditing : boolean = false;
	hoverIndex: number | null = null;
	token: any;
	// Edit Action Here
	applyAction: any;
	id: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
	dropdownSettings = {};
	url: any;
	departmentData: any;
	managerData: any = [];
	employeeData: any = [];
	managerList: any = [];
	employeeList: any = [];
	mealsData: any = [];
	shiftData: any = [];
	mealsList: any = [];
	shiftList: any = [];
	selectedMealsList: any = [];
	selectedshiftList: any = [];
	orders:any = 0;
	isallMealsActive = 'active';
	isallShiftsActive = 'active';
	existedRequest:any;
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private shiftService: ShiftService,
		private toastr: ToastrManager,
		public managerService: ManagerService,
		public employeeService: EmployeeService,
		public melasService: MealService,
		public requestService: RequestService
	) {
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.url = environment.Url + '/assets';
	}
  ngOnInit(): void {
		this.getExistedRequestData();
		this.getManagerData();
		this.getEmployeeData();
		this.getMealsData();
		this.getShiftData();
  }

	getExistedRequestData() {
		const obj = {};
		this.requestService.getExistedRequest(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.existedRequest = response.result;
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

	getMealsData() {
		const obj = {};
		this.melasService.getallMealDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.mealsData = response.result;
						this.mealsList = [];
						this.mealsData.forEach((item) => {
							item['ismealsActive'] = '';
							const meals = {
								_id: item._id,
								name: item.name,
							};
							this.mealsList.push(meals);
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

	getShiftData() {
		const obj = {};
		this.shiftService.getallShiftDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.shiftData = response.result;
						this.shiftList = [];
						this.shiftData.forEach((item) => {
							item['isshiftActive'] = '';
							const meals = {
								_id: item._id,
								name: item.name,
							};
							this.shiftList.push(meals);
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

  getManagerData() {
		const obj = {};
		this.managerService.getallManagerDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.managerData = response.result;
						this.managerList = [];
						this.managerData.forEach((item) => {
							const manager = {
								_id: item._id,
								name: item.username,
							};
							this.managerList.push(manager);
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

	selectMeals(type,data){
		if(type == 'all'){
			this.isallMealsActive = 'active';
			this.selectedMealsList = this.mealsData;
			this.mealsData.forEach((item) => {
				item['ismealsActive'] = '';
			});
		}
		if(type != 'all'){
			this.isallMealsActive = '';
			this.mealsData.forEach((item) => {
				if(data._id == item._id){
					// item['ismealsActive'] = 'active';
					  if (item['ismealsActive'] === 'active') {
						item['ismealsActive'] = '';
						// this.selectedMealsList = this.selectedMealsList.filter(meal => meal._id !== data._id);
						}else {
          // If inactive → activate & add to list
          item['ismealsActive'] = 'active';
          // this.selectedMealsList.push(data);
       		 }
				}
			});
			if(this.selectedMealsList.length == 0){
				this.selectedMealsList.push(data);
			} else {
				let tempmeal = this.selectedMealsList.filter((meal)=>meal._id == data._id);
				if(tempmeal.length == 0){
					this.selectedMealsList.push(data);
				}
			}
		}		
	}

	selectShifts(type,data){
		if(type == 'all'){
			this.isallShiftsActive = 'active';
			this.selectedshiftList = this.shiftData;
			this.shiftData.forEach((item) => {
				item['isshiftActive'] = '';
			});
		}
		if(type != 'all'){
			this.isallShiftsActive = '';
			this.shiftData.forEach((item) => {
				if(data._id == item._id){
					item['isshiftActive'] = 'active';
				}
			});
			if(this.selectedshiftList.length == 0){
				this.selectedshiftList.push(data);
			} else {
				let tempmeal = this.selectedshiftList.filter((meal)=>meal._id == data._id);
				if(tempmeal.length == 0){
					this.selectedshiftList.push(data);
				}
			}
		}		
	}

	onSubmit() {
		this.submitted = true;
		let obj = {
			meals : this.selectedMealsList,
			shifts: this.selectedshiftList,
			orders: this.orders
		};
		let id = this.id;
		obj['token'] = this.token;
		if (this.selectedMealsList.length == 0 || this.selectedshiftList.length == 0) {
			return;
		}
		if (!this.isEdit) {
			this.requestService.addRequest(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);

						setTimeout(() => {
							this.router.navigate(['/request/support-request']);
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
			this.requestService.editRequestdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/request/support-request']);
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

	calculateNoofOrders(){
		if(this.mealsData && this.mealsData.length > 0){
			let count: number = 0;
			this.mealsData.forEach(meal => {
				if(meal.nooforders){
					count += +meal.nooforders;
				}
			});
			this.orders = count;
		}
	}
 


}
