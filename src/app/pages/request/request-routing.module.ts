import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckComponent } from './check/check.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { SupportRequestComponent } from './support-request/support-request.component';
import { ProductionOverviewComponent } from './production-overview/production-overview.component';
import { RestuarentStatusComponent } from './restuarent-status/restuarent-status.component';

const routes: Routes = [
  {
    path: '',
    component: CheckComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'request',
    component: CheckComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'support-request',
    component: SupportRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'production-overview',
    component: ProductionOverviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'restuarent-status',
    component: RestuarentStatusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: CheckComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
