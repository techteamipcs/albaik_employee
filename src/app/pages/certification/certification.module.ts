import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificationRoutingModule } from './certification-routing.module';
import { AddCertificationComponent } from './add-certification/add-certification.component';
import { ViewCertificationComponent } from './view-certification/view-certification.component';


@NgModule({
  declarations: [
    AddCertificationComponent,
    ViewCertificationComponent
  ],
  imports: [
    CommonModule,
    CertificationRoutingModule
  ]
})
export class CertificationModule { }
