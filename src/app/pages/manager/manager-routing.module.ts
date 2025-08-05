import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewManagerComponent } from './view-manager/view-manager.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddManagerComponent } from './add-manager/add-manager.component';

const routes: Routes = [
  {
    path: '',
    component: ViewManagerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddManagerComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: 'view',
    component: ViewManagerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddManagerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ViewManagerComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
