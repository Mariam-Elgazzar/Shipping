import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
// Corrected the path to OrderDashboardComponent
import { OrderDashboardComponent } from './components/order/order-dashboard.component';

// import { LoginComponent } from './components/login/login.component';
import { RolesListComponent } from './components/admin/roles/roles-list/roles-list.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/shared/unauthorized/unauthorized.component';
import { CreateCityComponent } from './components/create-city/create-city.component';
import { CreateGovernmentComponent } from './components/create-government/create-government.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ForgotPasswordFormComponent } from './components/auth/forgot-password/forgot-password.component';
import { MerchantComponent } from './components/Merchants/merchant/merchant.component';
import { DeliveryComponent } from './components/Deliveries/delivery/delivery.component';
import { PermissionsListComponent } from './components/admin/permissions/permission-list/permissions-list.component';
import { PermissionsMatrixComponent } from './components/admin/permissions/permissions-matrix/permissions-matrix.component';
import { AddPermissionComponent } from './components/admin/permissions/add-permission/add-permission.component';
import { CouriersListComponent } from './components/couriers/couriers-list/couriers-list.component';
import { CourierManagementComponent } from './components/couriers/courier-management/courier-management.component';
import { MerchantListComponent } from './components/Merchants/merchant-list/merchant-list.component';
import { MerchantDetailsComponent } from './components/Merchants/merchant-details/merchant-details.component';
import { DeliveryDetailsComponent } from './components/Deliveries/delivery-details/delivery-details.component';
import { DeliveryListComponent } from './components/Deliveries/delivery-list/delivery-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { requiredPermission: 'dashboard:view' },
  },
  { path: 'create-city', component: CreateCityComponent },
  { path: 'create-government', component: CreateGovernmentComponent },

  { path: 'orders', component: OrderDashboardComponent },
  { path: 'CourierManagement', component: CourierManagementComponent },
  { path: 'Courierslist', component: CouriersListComponent },
  {
    path: 'merchants',
    component: MerchantComponent,
  },
  {
    path: 'merchantstable',
    component: MerchantListComponent,
  },
  {
    path: 'merchantdetails',
    component: MerchantDetailsComponent,
  },

  {
    path: 'deliverys',
    component: DeliveryComponent,
  },
  {
    path: 'DeliveryDetailsComponent',
    component: DeliveryDetailsComponent,
  },
  {
    path: 'DeliveryListComponent',
    component: DeliveryListComponent,
  },

  {
    path: 'shipments',
    component: ShipmentsComponent,
    // canActivate: [AuthGuard],
    // data: { requiredPermission: 'shipments:view' },
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
  {
    path: 'permissions-list',
    component: PermissionsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-permission',
    component: AddPermissionComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'permissions-matrix',
    component: PermissionsMatrixComponent,
    canActivate: [AuthGuard],
  },
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
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: '', redirectTo: 'login-form', pathMatch: 'full' },
      {
        path: 'login-form',
        component: LoginFormComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordFormComponent,
      },
    ],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
