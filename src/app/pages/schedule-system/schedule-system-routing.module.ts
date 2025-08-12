import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleEngineComponent } from './schedule-engine/schedule-engine.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ScheduleEngineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ScheduleEngineComponent,
    canActivate: [AuthGuard],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleSystemRoutingModule { }
