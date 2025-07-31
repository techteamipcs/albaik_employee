import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewShiftComponent } from './view-shift/view-shift.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddShiftComponent } from './add-shift/add-shift.component';

const routes: Routes = [
  {
    path: '',
    component: ViewShiftComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddShiftComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view',
    component: ViewShiftComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddShiftComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ViewShiftComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftRoutingModule { }
