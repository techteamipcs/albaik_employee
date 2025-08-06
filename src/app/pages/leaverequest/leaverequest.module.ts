import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaverequestRoutingModule } from './leaverequest-routing.module';
import { AddLeaverequestComponent } from './add-leaverequest/add-leaverequest.component';
import { ViewLeaverequestComponent } from './view-leaverequest/view-leaverequest.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxUploaderModule } from 'ngx-uploader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddLeaverequestComponent,
    ViewLeaverequestComponent
  ],
  imports: [
		CommonModule,
		LeaverequestRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgxUploaderModule,
		AngularEditorModule,
		Ng2SearchPipeModule,
		DatamoduleModule
  ]
})
export class LeaverequestModule { }
