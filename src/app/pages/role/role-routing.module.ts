import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRoleComponent } from './view-role/view-role.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddRoleComponent } from './add-role/add-role.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddRoleComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: 'view',
    component: ViewRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ViewRoleComponent,
    canActivate: [AuthGuard],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
