import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewPositionComponent } from './view-position/view-position.component';
import { AddPositionComponent } from './add-position/add-position.component';

const routes: Routes = [
  {
    path: '',
    component: ViewPositionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddPositionComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: 'view',
    component: ViewPositionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddPositionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ViewPositionComponent,
    canActivate: [AuthGuard],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionRoutingModule { }
