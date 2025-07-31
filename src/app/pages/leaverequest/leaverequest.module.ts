import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaverequestRoutingModule } from './leaverequest-routing.module';
import { AddLeaverequestComponent } from './add-leaverequest/add-leaverequest.component';
import { ViewLeaverequestComponent } from './view-leaverequest/view-leaverequest.component';


@NgModule({
  declarations: [
    AddLeaverequestComponent,
    ViewLeaverequestComponent
  ],
  imports: [
    CommonModule,
    LeaverequestRoutingModule
  ]
})
export class LeaverequestModule { }
