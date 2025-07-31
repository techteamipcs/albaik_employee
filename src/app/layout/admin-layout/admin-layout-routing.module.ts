import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'auth',
		loadChildren: () => import("./../../pages/auth/auth.module").then((m) => m.AuthModule),
		data: { title: 'Auth Module' },
	},
	{
		path: 'config',
		loadChildren: () => import("./../../pages/config/config.module").then((m) => m.ConfigModule),
		data: { title: 'Config Module' },
	},
	{
		path: 'media',
		loadChildren: () => import("./../../pages/media/media.module").then((m) => m.MediaModule),
		data: { title: 'Media Module' },
	},
	{
		path: 'page',
		loadChildren: () => import("./../../pages/page/page.module").then((m) => m.PageModule),
		data: { title: 'Page Module' },
	},
	{
		path: 'report',
		loadChildren: () => import("./../../pages/report/report.module").then((m) => m.ReportModule),
		data: { title: 'Report' },
	},
	{
		path: 'response',
		loadChildren: () => import("./../../pages/response/response.module").then((m) => m.ResponseModule),
		data: { title: 'Response' },
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
