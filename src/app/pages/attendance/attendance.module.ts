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

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';


@NgModule({
  declarations: [
    AddAttendanceComponent,
    ViewAttendanceComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
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
export class AttendanceModule { }
