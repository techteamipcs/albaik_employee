import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftRoutingModule } from './shift-routing.module';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { ViewShiftComponent } from './view-shift/view-shift.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxUploaderModule } from 'ngx-uploader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		AddShiftComponent,
		ViewShiftComponent
	],
	imports: [
		CommonModule,
		ShiftRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgxUploaderModule,
		AngularEditorModule,
		Ng2SearchPipeModule,
		DatamoduleModule
	]
})
export class ShiftModule { }
