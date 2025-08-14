import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleEngineComponent } from './schedule-engine/schedule-engine.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

const routes: Routes = [
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
