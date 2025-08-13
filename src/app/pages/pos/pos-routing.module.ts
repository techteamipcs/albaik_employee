import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPosComponent } from './view-pos/view-pos.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddPosComponent } from './add-pos/add-pos.component';

const routes: Routes = [
  {
    path: '',
    component: ViewPosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddPosComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: 'view',
    component: ViewPosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddPosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ViewPosComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
