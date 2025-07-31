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
		path: 'attendance',
		loadChildren: () => import("./../../pages/attendance/attendance.module").then((m) => m.AttendanceModule),
		data: { title: 'Attendance Module' },
	},
	{
		path: 'auth',
		loadChildren: () => import("./../../pages/auth/auth.module").then((m) => m.AuthModule),
		data: { title: 'Auth Module' },
	},
	{
		path: 'certification',
		loadChildren: () => import("./../../pages/certification/certification.module").then((m) => m.CertificationModule),
		data: { title: 'Certification Module' },
	},
	{
		path: 'config',
		loadChildren: () => import("./../../pages/config/config.module").then((m) => m.ConfigModule),
		data: { title: 'Config Module' },
	},
	{
		path: 'department',
		loadChildren: () => import("./../../pages/department/department.module").then((m) => m.DepartmentModule),
		data: { title: 'Department Module' },
	},
	{
		path: 'employee',
		loadChildren: () => import("./../../pages/employee/employee.module").then((m) => m.EmployeeModule),
		data: { title: 'Employee Module' },
	},
	{
		path: 'leaverequest',
		loadChildren: () => import("./../../pages/leaverequest/leaverequest.module").then((m) => m.LeaverequestModule),
		data: { title: 'Leaverequest Module' },
	},
	{
		path: 'manager',
		loadChildren: () => import("./../../pages/manager/manager.module").then((m) => m.ManagerModule),
		data: { title: 'Manager Module' },
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
	},
	{
		path: 'role',
		loadChildren: () => import("./../../pages/role/role.module").then((m) => m.RoleModule),
		data: { title: 'Role' },
	},
	{
		path: 'shift',
		loadChildren: () => import("./../../pages/shift/shift.module").then((m) => m.ShiftModule),
		data: { title: 'Shift' },
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
