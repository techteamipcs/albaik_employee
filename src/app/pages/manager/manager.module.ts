import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { ViewManagerComponent } from './view-manager/view-manager.component';


@NgModule({
  declarations: [
    AddManagerComponent,
    ViewManagerComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
