import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealRoutingModule } from './meal-routing.module';
import { MealAddComponent } from './meal-add/meal-add.component';
import { MealViewComponent } from './meal-view/meal-view.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClipboardModule } from 'ngx-clipboard';
import { PageModule } from '../page/page.module';
import { NgxUploaderModule } from 'ngx-uploader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
	declarations: [
		MealAddComponent,
		MealViewComponent
	],
	imports: [
		CommonModule,
		MealRoutingModule,
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
export class MealModule { }
