import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealViewComponent } from './meal-view/meal-view.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { MealAddComponent } from './meal-add/meal-add.component';

const routes: Routes = [
	{
		path: '',
		component: MealViewComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit/:id',
		component: MealAddComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
	{
		path: 'view',
		component: MealViewComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'add',
		component: MealAddComponent,
		canActivate: [AuthGuard],
	},
	{
		path: '**',
		component: MealViewComponent,
		canActivate: [AuthGuard],
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MealRoutingModule { }
