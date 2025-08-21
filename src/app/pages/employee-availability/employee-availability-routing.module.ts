import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { EmployeeAvailabilityComponent } from './employee-availability.component';

const routes: Routes = [
	{
		path: '',
		component: EmployeeAvailabilityComponent,
		canActivate: [AuthGuard],
	},

	{
		path: '**',
		component: EmployeeAvailabilityComponent,
		canActivate: [AuthGuard],
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeAvailabilityRoutingModule { }
