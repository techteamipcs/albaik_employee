import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCertificationComponent } from './view-certification/view-certification.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddCertificationComponent } from './add-certification/add-certification.component';

const routes: Routes = [
  {
    path: '',
    component: ViewCertificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddCertificationComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: 'view',
    component: ViewCertificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddCertificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ViewCertificationComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificationRoutingModule { }
