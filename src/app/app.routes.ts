import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';

import { LoginComponent } from './components/login/login.component';
import { RolesListComponent } from './components/admin/roles/roles-list/roles-list.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/shared/unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { requiredPermission: 'dashboard:view' },
  },
  {
    path: 'shipments',
    component: ShipmentsComponent,
    canActivate: [AuthGuard],
    data: { requiredPermission: 'shipments:view' },
  },
  // {
  //   path: 'shipments/:id',
  //   component: ShipmentDetailsComponent,
  //   canActivate: [AuthGuard],
  //   data: { requiredPermission: 'shipments:view' },
  // },
  // {
  //   path: 'orders',
  //   component: OrdersComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'customers',
  //   component: CustomersComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'reports',
  //   component: ReportsComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'settings',
  //   component: SettingsComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'admin/roles',
    component: RolesListComponent,
    canActivate: [AuthGuard],
    data: { requiredPermission: 'roles:manage' },
  },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
