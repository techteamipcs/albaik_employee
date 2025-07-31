import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const routes: Routes = [
  {
    path: '',
    component: ViewEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view',
    component: ViewEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ViewEmployeeComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
