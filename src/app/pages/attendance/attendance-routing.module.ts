import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';

const routes: Routes = [
  {
    path: '',
    component: ViewAttendanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddAttendanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view',
    component: ViewAttendanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddAttendanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ViewAttendanceComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
