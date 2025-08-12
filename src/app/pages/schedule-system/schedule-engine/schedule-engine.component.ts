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
  selector: 'app-schedule-engine',
  templateUrl: './schedule-engine.component.html',
  styleUrls: ['./schedule-engine.component.scss']
})
export class ScheduleEngineComponent {
 imagePath: any;
 url:any;
	imageArr: any = [];
currentStep = 0;
  steps = [0, 1, 2, 3, 4, 5, 6];
  completedSteps: boolean[] = [false, false, false, false, false, false, false];
token: any;
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

  formData = {
    name: '',
    email: '',
    gender: '',
    rating: 3,
    features: {
    dashboard: false,
    reports: false,
    settings: false
    },
    comments: ''
  };

  nextStep() {
    // Mark current step as completed only if required fields are filled
    if (this.isStepValid(this.currentStep)) {
      this.completedSteps[this.currentStep] = true;
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    } else {
      alert('Please fill in this step before continuing.');
    }
  }
	  isStepValid(step: number): boolean {
    switch (step) {
      case 1: return this.formData.name.trim() !== '';
      case 2: return this.formData.email.trim() !== '';
      case 3: return this.formData.gender.trim() !== '';
      case 4: return !!this.formData.rating;
      case 5: return this.formData.features.dashboard || this.formData.features.reports || this.formData.features.settings;
      default: return true;
    }
  }

  goToStep(index: number) {
    this.currentStep = index;
  }

  onSubmitform() {
		this.completedSteps[this.currentStep] = true;
    console.log('Form submitted:', this.formData);
    alert('Form submitted successfully!');
  }



}
