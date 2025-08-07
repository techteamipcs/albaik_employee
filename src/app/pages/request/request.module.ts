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

import { RequestRoutingModule } from './request-routing.module';
import { CheckComponent } from './check/check.component';
import { SupportRequestComponent } from './support-request/support-request.component';
import { ProductionOverviewComponent } from './production-overview/production-overview.component';
import { RestuarentStatusComponent } from './restuarent-status/restuarent-status.component';


@NgModule({
  declarations: [
    CheckComponent,
    SupportRequestComponent,
    ProductionOverviewComponent,
    RestuarentStatusComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
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
export class RequestModule { }
