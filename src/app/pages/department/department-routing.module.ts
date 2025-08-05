import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewDepartmentComponent } from './view-department/view-department.component';
import { AddDepartmentComponent } from './add-department/add-department.component';

const routes: Routes = [
  {
    path: '',
    component: ViewDepartmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddDepartmentComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: 'view',
    component: ViewDepartmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddDepartmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ViewDepartmentComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
