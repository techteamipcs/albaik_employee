import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftRoutingModule } from './shift-routing.module';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { ViewShiftComponent } from './view-shift/view-shift.component';


@NgModule({
  declarations: [
    AddShiftComponent,
    ViewShiftComponent
  ],
  imports: [
    CommonModule,
    ShiftRoutingModule
  ]
})
export class ShiftModule { }
