import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ScheduleSystemRoutingModule } from './schedule-system-routing.module';
import { ScheduleEngineComponent } from './schedule-engine/schedule-engine.component';

import { NgxUploaderModule } from 'ngx-uploader';
import { PageModule } from '../page/page.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { ClipboardModule } from 'ngx-clipboard';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { ScheduleGanttComponent } from './schedule-gantt/schedule-gantt.component';
import { NgGanttEditorModule } from 'ng-gantt';

@NgModule({
  declarations: [
    ScheduleEngineComponent,
    ScheduleListComponent,
    ScheduleEditComponent,
    ScheduleGanttComponent
  ],
  imports: [
    CommonModule,
    ScheduleSystemRoutingModule,
    AngularEditorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    PageModule,
    ClipboardModule,
    NgMultiSelectDropDownModule,
    DatamoduleModule,
    NgGanttEditorModule
  ]
})
export class ScheduleSystemModule { }
