import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUploaderModule } from 'ngx-uploader';
import { PageModule } from '../page/page.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { ClipboardModule } from 'ngx-clipboard';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeAvailabilityRoutingModule } from './employee-availability-routing.module';
import { EmployeeAvailabilityComponent } from './employee-availability.component';


@NgModule({
	declarations: [
		EmployeeAvailabilityComponent
	],
	imports: [
		CommonModule,
		EmployeeAvailabilityRoutingModule,
		AngularEditorModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgxUploaderModule,
		PageModule,
		ClipboardModule,
		NgMultiSelectDropDownModule,
		DatamoduleModule
	]
})
export class EmployeeAvailabilityModule { }
