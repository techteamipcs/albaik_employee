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

import { RoleRoutingModule } from './role-routing.module';
import { AddRoleComponent } from './add-role/add-role.component';
import { ViewRoleComponent } from './view-role/view-role.component';


@NgModule({
  declarations: [
    AddRoleComponent,
    ViewRoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
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
export class RoleModule { }
