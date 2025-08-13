import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

import { ToastrManager } from 'ng6-toastr-notifications';
import { RoleService } from 'src/app/providers/role/role.service';
import { MealService } from 'src/app/providers/meal/meal.service';
import { EmployeeService } from 'src/app/providers/employee/employee.service';
import { DepartmentService } from 'src/app/providers/department/department.service';
import { PositionService } from 'src/app/providers/position/position.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from '../../../providers/media/media.service';
@Component({
	selector: 'app-meal-add',
	templateUrl: './meal-add.component.html',
	styleUrls: ['./meal-add.component.scss']
})
export class MealAddComponent implements OnInit {

	@ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;
	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	bannerImage: any;
	bannerVideo: any;
	imagePath: any;
	imageArr: any = [];
	mediaData: any;
	images: any = [];

	addmediaForm: FormGroup;
	submittedMedia: boolean = false;
	fileFormat: any;
	temp_sequence_number = 0;
	mediaFile: any;
	isUploaded: boolean = false;

	isMediaDeleted = false;
	deletedMediaData: any;
	isMediaFileDeleted = false;
	deletedMediaFile: any = [];
	isMediaEdit = false;
	mediaID: any;
	bannerData: any;
	ImageName: any;


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
		private mediaService: MediaService,
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.options = { concurrency: 0, allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'] };

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
		this.imagePath = environment.baseUrl + '/public/meal/';
		this.url = environment.Url + '/assets';
		this.addmediaForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: [true, Validators.required],
			sequence_number: [''],
			src: ['', Validators.required],
			format: [''],
			file_type: ['image'],
			alt: [''],
			role: [''],
			resolution: [''],
			size: [''],
			height: [''],
			width: [''],
			mute: ['muted'],
			autoplay: [true],
			loop: [true],
			full_screen: [''],
		});
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
				if (data?.department_needs) {
					this.selectedDeptData = data?.department_needs;
				}
				this.mediaData = data?.media_data;
				this.ImageName = data?.image;
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
					image: data?.image,

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
		if (this.mediaData) {
			obj['image'] = this.mediaData._id;
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

	openMedia(content: any) {
		this.addmediaForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: [true, Validators.required],
			sequence_number: [''],
			src: ['', Validators.required],
			format: [''],
			file_type: ['image'],
			alt: [''],
			role: [''],
			resolution: [''],
			size: [''],
			height: [''],
			width: [''],
			mute: ['muted'],
			autoplay: [true],
			loop: [true],
			full_screen: [''],
		});
		this.mediaFile = '';
		this.isMediaEdit = false;
		this.mediaID = '';
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl', backdrop: 'static' })
			.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
	}

	editMedia(content: any, mediaData, type) {
		this.isMediaEdit = true;
		this.mediaFile = mediaData.src;
		this.mediaID = mediaData._id;
		this.addmediaForm.patchValue({
			name: mediaData.name,
			status: mediaData.status,
			sequence_number: mediaData.sequence_number,
			src: mediaData.src,
			format: mediaData.format,
			file_type: mediaData.file_type,
			alt: mediaData.alt,
			role: mediaData.role,
			resolution: mediaData.resolution,
			size: mediaData.size,
			height: mediaData.height,
			width: mediaData.width,
			mute: mediaData.mute,
			autoplay: mediaData.autoplay,
			loop: mediaData.loop,
			full_screen: mediaData.full_screen,
		});
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl', backdrop: 'static' })
			.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
	}

	onUploadOutput(output: UploadOutput, typeofImage): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/meal/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.isUploaded = true;
			this.fileFormat = output.file.type;
			if (this.mediaFile) {
				this.deletedMediaFile.push(this.mediaFile);
				this.isMediaFileDeleted = true;
			}
			this.mediaFile = output.file.response.result;
			this.addmediaForm.value.resolution = output.file.size;
			this.submittedMedia = false;
			this.addmediaForm.patchValue({
				src: this.mediaFile
			});
		}
	}

	selectImageRole(event, role) {
		if (role == 'base') {
			this.addmediaForm.patchValue({
				height: 1100,
				width: 1100,
			});
		} else if (role == 'small') {
			this.addmediaForm.patchValue({
				height: 309,
				width: 309,
			});
		} else if (role == 'thumbnail') {
			this.addmediaForm.patchValue({
				height: 150,
				width: 150,
			});
		}
	}

	public hasMediaFormError = (controlName: string, errorName: string) => {
		return this.addmediaForm.controls[controlName].hasError(errorName);
	};

	onSubmitMedia(type) {
		let obj = this.addmediaForm.value;
		let id = this.mediaID;
		obj['token'] = this.token;
		obj['src'] = this.mediaFile;
		obj['format'] = this.fileFormat;
		this.submittedMedia = true;
		if (this.addmediaForm.invalid) {
			return;
		}
		if (!this.isMediaEdit) {
			this.mediaService.addMedia(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.submittedMedia = false;
						if (this.deletedMediaFile.length > 0) {
							this.deleteMediaFile();
						}
						this.toastr.successToastr(response.message);
						if (this.addmediaForm.value.sequence_number) {
							this.temp_sequence_number = this.addmediaForm.value.sequence_number
						} else {
							this.temp_sequence_number = this.temp_sequence_number + 1;
						}
						this.images.push({
							media_id: response.result._id,
							file_name: response.result.name,
							sequence_number: this.addmediaForm.value.sequence_number
						});
						this.mediaData = response.result;
						this.mediaFile = '';
						this.isUploaded = false;
						this.addmediaForm = this.formBuilder.group({
							name: ['', Validators.required],
							status: [true, Validators.required],
							sequence_number: [''],
							src: ['', Validators.required],
							format: [''],
							file_type: ['image'],
							alt: [''],
							role: [''],
							resolution: [''],
							size: [''],
							height: [''],
							width: [''],
							mute: ['muted'],
							autoplay: [true],
							loop: [true],
							full_screen: [''],
						});
						this.modalService.dismissAll();
					}
					else {
						this.toastr.errorToastr(response.message);
					}
				},
			);
		}
		else {
			if (id) {
				this.mediaService.editMediadata(obj, id).subscribe(
					(response) => {
						if (response.code == 200) {
							this.throw_msg = response.message
							this.msg_success = true;
							this.toastr.successToastr(response.message);
							if (this.mediaData) {
								this.deletedMediaFile.push(this.mediaData.src);
								this.deleteMediaFile();
							}
							setTimeout(() => {
								this.mediaData.src = response.result.src;
								window.location.reload();
							}, 1000);
							this.mediaData.src = response.result.src;
							if (this.bannerData.media_data && this.bannerData.media_data.length > 0) {
								this.patchingdata(this.id);
							}
							this.modalService.dismissAll();
						} else {
							this.throw_msg = response.message
							this.msg_danger = true;
							this.toastr.errorToastr(response.message);
						}
					},
				);
			}
		}
	}

	onCancelMedia() {
		this.addmediaForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: [true, Validators.required],
			sequence_number: [''],
			src: ['', Validators.required],
			format: [''],
			file_type: ['image'],
			alt: [''],
			role: [''],
			resolution: [''],
			size: [''],
			height: [''],
			width: [''],
			mute: ['muted'],
			autoplay: [true],
			loop: [true],
			full_screen: [''],
		});
		this.modalService.dismissAll();
		this.deletedMediaFile.push(this.mediaFile);
		this.deleteMediaFile();
	}

	deleteMediaFile() {
		if (this.isUploaded && this.deletedMediaFile && this.deletedMediaFile.length > 0) {
			let obj = {};
			obj['files'] = this.deletedMediaFile;
			this.mediaService.deletefile(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.isUploaded = false;
						this.mediaFile = '';
						this.deletedMediaFile = [];
					}
				},
			);
		}
	}

}
