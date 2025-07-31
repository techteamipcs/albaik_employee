import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    AttendanceRoutingModule
  ]
})
export class AttendanceModule { }
