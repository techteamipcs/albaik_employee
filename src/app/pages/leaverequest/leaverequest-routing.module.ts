import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewLeaverequestComponent } from './view-leaverequest/view-leaverequest.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddLeaverequestComponent } from './add-leaverequest/add-leaverequest.component';

const routes: Routes = [
  {
    path: '',
    component: ViewLeaverequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddLeaverequestComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: 'view',
    component: ViewLeaverequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddLeaverequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ViewLeaverequestComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaverequestRoutingModule { }
