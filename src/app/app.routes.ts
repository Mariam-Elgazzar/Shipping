import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { RolesListComponent } from './components/admin/roles/roles-list/roles-list.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/shared/unauthorized/unauthorized.component';
import { OrderDashboardComponent } from './components/order/order-dashboard.component';
import { CreateCityComponent } from './components/city/create-city/create-city.component';
import { CreateGovernmentComponent } from './components/government/create-government/create-government.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ForgotPasswordFormComponent } from './components/auth/forgot-password/forgot-password.component';
import { MerchantComponent } from './components/Merchants/add-merchant/merchant.component';
import { DeliveryComponent } from './components/Deliveries/add-delivery/delivery.component';
import { PermissionsListComponent } from './components/admin/permissions/permission-list/permissions-list.component';
import { PermissionsMatrixComponent } from './components/admin/permissions/permissions-matrix/permissions-matrix.component';
import { AddPermissionComponent } from './components/admin/permissions/add-permission/add-permission.component';
import { MerchantListComponent } from './components/Merchants/merchant-list/merchant-list.component';
import { MerchantDetailsComponent } from './components/Merchants/merchant-details/merchant-details.component';
import { DeliveryDetailsComponent } from './components/Deliveries/delivery-details/delivery-details.component';
import { DeliveryListComponent } from './components/Deliveries/delivery-list/delivery-list.component';
// import { EmployeeListComponent } from './components/Employee/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/Employee/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/Employee/emplyee-list/employee-list.component';
import { DeliveryUpdateComponent } from './components/Deliveries/delivery-update/delivery-update.component';
import { MerchantUpdateComponent } from './components/Merchants/merchant-update/merchant-update.component';
import { CityListComponent } from './components/city/city-list/city-list.component';
import { CityDetailsComponent } from './components/city/city-details/city-details.component';
import { GovernmentListComponent } from './components/government/government-list/government-list.component';
import { GovernmentDetailsComponent } from './components/government/government-details/government-details.component';
import { BranchesListComponent } from './components/branches/branches-list/branches-list.component';
import { CityUpdateComponent } from './components/city/city-update/city-update.component';
import { CityAddComponent } from './components/city/city-add/city-add.component';
import { GovernmentUpdateComponent } from './components/government/government-update/government-update.component';
import { EmployeeAddComponent } from './components/Employee/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './components/Employee/employee-update/employee-update.component';
import { BrancheAddComponent } from './components/branches/branche-add/branche-add.component';
import { BranchesUpdateComponent } from './components/branches/branche-update/branche-update.component';

// path: 'branches/:id/edit'

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
  { path: 'updategovernment', component: GovernmentUpdateComponent },
  { path: 'orders', component: OrderDashboardComponent },
  { path: 'orders', component: OrderDashboardComponent },

  // { path: "orders", component: OrderDashboardComponent },
  // { path: '**', redirectTo: '' },

  // { path: 'CourierManagement', component: CourierManagementComponent },
  // { path: 'Courierslist', component: CouriersListComponent },
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
    path: 'merchantUpdate',
    component: MerchantUpdateComponent,
  },
  {
    path: 'Citys',
    component: CreateCityComponent,
  },
  {
    path: 'Cityadd',
    component: CityAddComponent,
  },
  {
    path: 'Cityslist',
    component: CityListComponent,
  },
  {
    path: 'Citydetails',
    component: CityDetailsComponent,
  },
  {
    path: 'Cityupdate',
    component: CityUpdateComponent,
  },
  {
    path: 'Governments',
    component: CreateGovernmentComponent,
  },
  {
    path: 'Governmentslist',
    component: GovernmentListComponent,
  },
  {
    path: 'brancheslist',
    component: BranchesListComponent,
  },
  {
    path: 'brancheupdate',
    component: BranchesUpdateComponent,
  },
  {
    path: 'brancheadd',
    component: BrancheAddComponent,
  },
  {
    path: 'Governmentdetails',
    component: GovernmentDetailsComponent,
  },
  {
    path: 'Employeestable',
    component: EmployeeListComponent,
  },
  {
    path: 'addEmployee',
    component: EmployeeAddComponent,
  },
  {
    path: 'Employeedetails',
    component: EmployeeDetailsComponent,
  },
  {
    path: 'Employeeupdate',
    component: EmployeeUpdateComponent,
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
    path: 'DeliveryUpdate',
    component: DeliveryUpdateComponent,
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
