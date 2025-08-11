import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MealService } from '../../../providers/meal/meal.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-meal-view',
	templateUrl: './meal-view.component.html',
	styleUrls: ['./meal-view.component.scss']
})
export class MealViewComponent {

	msg_danger: boolean = false;
	MealData: any = [];
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';
	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedMeal: any;
	closeResult = '';
	modalReference = null;
	selectedCustomergroup: any;
	deletedMediaFiles: any = [];
	deletMediaFilesData: any = [];
	constructor(
		private router: Router,
		private mealService: MealService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('albaik-admin-token');
	}

	ngOnInit(): void {
		this.get_MealData();
		// this.get_VendorData();
	}

	get_MealData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.mealService.getMealDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.MealData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
						this.MealData = [];
					}
				}
			},
		);
	}

	deleteMeal() {
		if (this.selectedMeal) {
			var mylist = { id: this.selectedMeal._id };
			mylist['token'] = this.token;
			this.mealService.deleteMeal(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_MealData();
						this.modalService.dismissAll();
						this.router.navigate(['/meal/view']);
					}
				},
			);
		}
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_MealData();
	}

	open(content, data) {
		this.selectedMeal = data;
		if (this.selectedMeal) {
			var mylist = { id: this.selectedMeal._id };
			this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
				(result) => {
					this.closeResult = `Closed with: ${result}`;
				},
				(reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				},
			);
		}
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

	closeModal() {
		this.activeModal.close();
	}
}
