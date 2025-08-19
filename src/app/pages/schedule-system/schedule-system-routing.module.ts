import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleEngineComponent } from './schedule-engine/schedule-engine.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { ScheduleGanttComponent } from './schedule-gantt/schedule-gantt.component';

const routes: Routes = [
  {
    path: 'edit',
    component: ScheduleEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'engine',
    component: ScheduleEngineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    component: ScheduleListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gantt',
    component: ScheduleGanttComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ScheduleListComponent,
    canActivate: [AuthGuard],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleSystemRoutingModule { }
