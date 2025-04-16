
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { RolesListComponent } from './components/admin/roles/roles-list/roles-list.component';
// import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/shared/unauthorized/unauthorized.component';
// import { OrderDashboardComponent } from './components/order/order-dashboard.component';
import { CreateCityComponent } from './components/city/create-city/create-city.component';
import { CreateGovernmentComponent } from './components/government/create-government/create-government.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';

// import { DeliveryComponent } from './components/Deliveries/add-delivery/delivery.component';
import { PermissionsListComponent } from './components/admin/permissions/permission-list/permissions-list.component';
import { PermissionsMatrixComponent } from './components/admin/permissions/permissions-matrix/permissions-matrix.component';
import { AddPermissionComponent } from './components/admin/permissions/add-permission/add-permission.component';
import { MerchantListComponent } from './components/Merchants/merchant-list/merchant-list.component';
import { MerchantDetailsComponent } from './components/Merchants/merchant-details/merchant-details.component';
import { DeliveryDetailsComponent } from './components/Deliveries/delivery-details/delivery-details.component';
import { DeliveryListComponent } from './components/Deliveries/delivery-list/delivery-list.component';
// import { EmployeeListComponent } from './components/Employee/employee-list/employee-list.component';
// import { EmployeeDetailsComponent } from './components/Employee/employee-details/employee-details.component';
// import { EmployeeListComponent } from './components/Employee/emplyee-list/employee-list.component';

// import { DeliveryUpdateComponent } from './components/Deliveries/delivery-update/delivery-update.component';
import { MerchantUpdateComponent } from './components/Merchants/merchant-update/merchant-update.component';
import { CityListComponent } from './components/city/city-list/city-list.component';
import { CityDetailsComponent } from './components/city/city-details/city-details.component';
import { GovernmentListComponent } from './components/government/government-list/government-list.component';
import { GovernmentDetailsComponent } from './components/government/government-details/government-details.component';
import { BranchesListComponent } from './components/branches/branches-list/branches-list.component';
import { CityUpdateComponent } from './components/city/city-update/city-update.component';
import { CityAddComponent } from './components/city/city-add/city-add.component';
import { GovernmentUpdateComponent } from './components/government/government-update/government-update.component';
// import { EmployeeAddComponent } from './components/Employee/employee-add/employee-add.component';
// import { EmployeeUpdateComponent } from './components/Employee/employee-update/employee-update.component';
import { BrancheAddComponent } from './components/branches/branche-add/branche-add.component';
import { BranchesUpdateComponent } from './components/branches/branche-update/branche-update.component';
import { MerchantFormComponent } from './components/Merchants/add-merchant/merchant.component';
import { DeliveryDashboardComponent } from './components/delivery/delivery-dashboard/delivery-dashboard.component';

// import { DashboardComponent } from './components/dashboard/dashboard.component';

import { DeliveryFormComponent } from './components/Deliveries/add-delivery/delivery.component';
import { PricingAddComponent } from './components/price/pricing-create/pricing-create.component';
// import { PricingListComponent } from './components/price/pricing-list/pricing-list.component';
import { PricingDetailsComponent } from './components/price/pricing-details/pricing-details.component';
import { PricingUpdateComponent } from './components/price/pricing-update/pricing-update.component';

import { OrderReportComponent } from './components/reports/order-report.component';
import { UpdateEmployeeComponent } from './components/Employee/update-employee/update-employee.component';
import { EmployeeComponent } from './components/Employee/emplyee-list/employee-list.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  // canActivate: [AuthGuard],
  // data: { requiredPermission: 'dashboard:view' },

  { path: 'city/add', component: CreateCityComponent },

  { path: 'create-government', component: CreateGovernmentComponent },

  // { path: 'orders', component: OrderDashboardComponent },
  // { path: 'orders', component: OrderDashboardComponent },

  // { path: "orders", component: OrderDashboardComponent },
  //  { path: "delivery", component: DeliveryDashboardComponent },
  { path: 'delivery', component: DeliveryDashboardComponent },

  // { path: 'CourierManagement', component: CourierManagementComponent },
  // { path: 'Courierslist', component: CouriersListComponent },
  { path: 'merchants/create', component: MerchantFormComponent },
  { path: 'merchants/edit/:id', component: MerchantFormComponent },
  {
    path: 'merchant',
    component: MerchantFormComponent,
  },

  { path: 'delivery-reps', component: DeliveryListComponent },
  { path: 'delivery-reps/add', component: DeliveryFormComponent },
  { path: 'delivery-reps/edit/:id', component: DeliveryFormComponent },
  { path: '', redirectTo: '/delivery-reps', pathMatch: 'full' },

  // {
  //   path: 'deliverys',
  //   component: OrderDashboardComponent,
  // },
  { path: 'reports/orders', component: OrderReportComponent },

  { path: 'merchantUpdate', component: MerchantDetailsComponent },
  {
    path: 'merchantAdd',
    component: MerchantDetailsComponent,
  },
  // {
  //   path: 'City/add',
  //   component: CreateCityComponent,
  // },
  {
    path: 'City/add',
    component: CityAddComponent,
  },
  {
    path: 'Citys/list',
    component: CityListComponent,
  },
  {
    path: 'City/details',
    component: CityDetailsComponent,
  },
  {
    path: 'City/:id/update',
    component: CityUpdateComponent,
  },
  {
    path: 'Government/add',
    component: CreateGovernmentComponent,
  },
  {
    path: 'Government/list',
    component: GovernmentListComponent,
  },
  {
    path: 'government/:id/update',
    component: GovernmentUpdateComponent,
  },
  {
    path: 'branche/list',
    component: BranchesListComponent,
  },
  {
    path: 'branche/:id/edit',
    component: BranchesUpdateComponent,
  },
  {
    path: 'branche/add',
    component: BrancheAddComponent,
  },
  {
    path: 'Government/details',
    component: GovernmentDetailsComponent,
  },
  {
    path: 'Employee/list',
    component: EmployeeComponent,
  },
  // {
  //   path: 'Employee/add',
  //   component: EmployeeAddComponent,
  // },
  // {
  //   path: 'Employee/details',
  //   component: EmployeeDetailsComponent,
  // },
  // {
  //   path: 'Employee/:id/update',
  //   component: EmployeeUpdateComponent,
  // },

  {
    path: 'deliverys',
    component: DeliveryFormComponent,
  },
  {
    path: 'Delivery/Details',
    component: DeliveryDetailsComponent,
  },
  {
    path: 'Delivery/List',
    component: DeliveryListComponent,
  },

  // {
  //   path: 'Delivery/:id/Update',
  //   component: DeliveryUpdateComponent,
  // },

  {
    path: 'price/add',
    component: PricingAddComponent,
  },
  // {
  //   path: 'price/list',
  //   component: PricingListComponent,
  // },
  {
    path: 'price/details',
    component: PricingDetailsComponent,
  },
  {
    path: 'price/update/:id',
    component: PricingUpdateComponent,
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
    path: 'permissions/list',
    component: PermissionsListComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'permission/',
    component: AddPermissionComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'permissions-matrix',
    component: PermissionsMatrixComponent,
    // canActivate: [AuthGuard],
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
    // canActivate: [AuthGuard],
    // data: { requiredPermission: 'roles:manage' },
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
        component: ForgotPasswordComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
    ],
  },
  {
    path: 'reset-password',
    redirectTo: 'login/reset-password',
    pathMatch: 'full',
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// // import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { ShipmentsComponent } from './components/shipments/shipments.component';
// import { RolesListComponent } from './components/admin/roles/roles-list/roles-list.component';
// // import { AuthGuard } from './guards/auth.guard';
// import { UnauthorizedComponent } from './components/shared/unauthorized/unauthorized.component';
// import { OrderDashboardComponent } from './components/order/order-dashboard.component';
// import { CreateCityComponent } from './components/city/create-city/create-city.component';

// // Auth
// import { LoginComponent } from './pages/login/login.component';
// import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

// import { DeliveryComponent } from './components/Deliveries/add-delivery/delivery.component';
// import { PermissionsListComponent } from './components/admin/permissions/permission-list/permissions-list.component';
// import { PermissionsMatrixComponent } from './components/admin/permissions/permissions-matrix/permissions-matrix.component';
// import { AddPermissionComponent } from './components/admin/permissions/add-permission/add-permission.component';
// import { MerchantListComponent } from './components/Merchants/merchant-list/merchant-list.component';
// import { MerchantDetailsComponent } from './components/Merchants/merchant-details/merchant-details.component';
// import { DeliveryDetailsComponent } from './components/Deliveries/delivery-details/delivery-details.component';
// import { DeliveryListComponent } from './components/Deliveries/delivery-list/delivery-list.component';
// // import { EmployeeListComponent } from './components/Employee/employee-list/employee-list.component';
// import { EmployeeDetailsComponent } from './components/Employee/employee-details/employee-details.component';
// import { EmployeeListComponent } from './components/Employee/emplyee-list/employee-list.component';
// import { DeliveryUpdateComponent } from './components/Deliveries/delivery-update/delivery-update.component';
// import { MerchantUpdateComponent } from './components/Merchants/merchant-update/merchant-update.component';
// import { CityListComponent } from './components/city/city-list/city-list.component';
// import { CityDetailsComponent } from './components/city/city-details/city-details.component';
// // import { GovernorateListComponent } from './components/government/government-list/government-list.component';
// // import { GovernorateDetailsComponent } from './components/government/government-details/government-details.component';
// import { BranchesListComponent } from './components/branches/branches-list/branches-list.component';
// import { CityUpdateComponent } from './components/city/city-update/city-update.component';
// import { CityAddComponent } from './components/city/city-add/city-add.component';
// // import { GovernmentUpdateComponent } from './components/government/government-update/government-update.component';

// import { EmployeeAddComponent } from './components/Employee/employee-add/employee-add.component';
// import { EmployeeListComponent } from './components/Employee/emplyee-list/employee-list.component';
// import { EmployeeUpdateComponent } from './components/Employee/employee-update/employee-update.component';

// // Merchant
// import { MerchantFormComponent } from './components/Merchants/add-merchant/merchant.component';
// import { MerchantUpdateComponent } from './components/Merchants/merchant-update/merchant-update.component';
// import { MerchantListComponent } from './components/Merchants/merchant-list/merchant-list.component';

// // import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { PricingAddComponent } from './components/price/pricing-create/pricing-create.component';
// import { PricingListComponent } from './components/price/pricing-list/pricing-list.component';
// import { PricingDetailsComponent } from './components/price/pricing-details/pricing-details.component';
// import { PricingUpdateComponent } from './components/price/pricing-update/pricing-update.component';

// // Role & Permission
// // import { RoleListComponent } from './components/role-permission/role-list/role-list.component';
// // import { RoleAddComponent } from './components/role-permission/role-add/role-add.component';
// // import { RoleEditComponent } from './components/role-permission/role-edit/role-edit.component';
// // import { PermissionListComponent } from './components/role-permission/permission-list/permission-list.component';
// // import { PermissionAddComponent } from './components/role-permission/permission-add/permission-add.component';
// // import { PermissionEditComponent } from './components/role-permission/permission-edit/permission-edit.component';

// // Orders & Delivery
// import { OrderDashboardComponent } from './components/order/order-dashboard.component';
// import { DeliveryComponent } from './components/Deliveries/add-delivery/delivery.component';
// import { DeliveryUpdateComponent } from './components/Deliveries/delivery-update/delivery-update.component';

// import { OrderReportComponent } from './components/reports/order-report.component';
// import { UpdateEmployeeComponent } from './components/Employee/update-employee/update-employee.component';
// import { EditGovernmentComponent } from './components/government/government-update/government-update.component';
// import { GovernmentListComponent } from './components/government/government-list/government-list.component';
// import { GovernmentDetailsComponent } from './components/government/government-details/government-details.component';
// import { CreateGovernmentComponent } from './components/government/create-government/create-government.component';

// // Settings
// // import { SettingComponent } from './components/settings/setting/setting.component';
// // import { AddSettingComponent } from './components/settings/add-setting/add-setting.component';
// // import { EditSettingComponent } from './components/settings/edit-setting/edit-setting.component';

// // City & Government
// import { CityListComponent } from './components/city/city-list/city-list.component';
// import { CityAddComponent } from './components/city/city-add/city-add.component';
// import { CityUpdateComponent } from './components/city/city-update/city-update.component';
// import { CreateGovernmentComponent } from './components/government/create-government/create-government.component';
// import { GovernmentListComponent } from './components/government/government-list/government-list.component';
// import { GovernmentUpdateComponent } from './components/government/government-update/government-update.component';

// // Reports
// import { OrderReportComponent } from './components/reports/order-report.component';
// import { RolesListComponent } from './components/admin/roles/roles-list/roles-list.component';
// import { PermissionsListComponent } from './components/admin/permissions/permission-list/permissions-list.component';
// import { AddPermissionComponent } from './components/admin/permissions/add-permission/add-permission.component';
// import { PermissionsMatrixComponent } from './components/admin/permissions/permissions-matrix/permissions-matrix.component';

//   // { path: 'create-government', component: CreateGovernorateComponent },

// //price
// import { PricingListComponent } from './components/price/pricing-list/pricing-list.component';
// import { PricingUpdateComponent } from './components/price/pricing-update/pricing-update.component';
// import { PricingCreateComponent } from './components/price/pricing-create/pricing-create.component';
// import { BranchesListComponent } from './components/branches/branches-list/branches-list.component';
// import { BranchesUpdateComponent } from './components/branches/branche-update/branche-update.component';
// import { BrancheAddComponent } from './components/branches/branche-add/branche-add.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },

//   // Auth
//   { path: 'login', component: LoginComponent },
//   { path: 'reset-password', component: ResetPasswordComponent },

//   // Dashboard
//   // { path: 'dashboard', component: DashboardComponent },

//   // Employees
//   { path: 'employee/list', component: EmployeeListComponent },
//   { path: 'employee/add', component: EmployeeAddComponent },
//   { path: 'employee/update/:id', component: EmployeeUpdateComponent },

//   // Merchants
//   { path: 'merchant/list', component: MerchantListComponent },
//   { path: 'merchant/add', component: MerchantFormComponent },
//   { path: 'merchant/update/:id', component: MerchantUpdateComponent },

//   // Roles & Permissions
//   { path: 'roles', component: RolesListComponent },
//   // { path: 'role/add', component: RoleAddComponent },
//   // { path: 'role/edit/:id', component: RoleEditComponent },
//   { path: 'permission', component: PermissionsListComponent },
//   { path: 'permission/add', component: AddPermissionComponent },
//   // { path: 'permission/edit/:id', component: PermissionEditComponent },
//   {path: 'permissions-matrix',component: PermissionsMatrixComponent},

//   // Orders & Deliveries

//   { path: 'orders', component: OrderDashboardComponent },
//   { path: 'deliveries', component: DeliveryComponent },
//   { path: 'delivery/update/:id', component: DeliveryUpdateComponent },

//   // Settings
//   // { path: 'settings', component: SettingComponent },
//   // { path: 'setting/add', component: AddSettingComponent },
//   // { path: 'setting/edit/:id', component: EditSettingComponent },

//   },
//   // {
//   //   path: 'City/add',
//   //   component: CreateCityComponent,
//   // },
//   {
//     path: 'City/add',
//     component: CityAddComponent,
//   },
//   {
//     path: 'Citys/list',
//     component: CityListComponent,
//   },
//   {
//     path: 'City/details',
//     component: CityDetailsComponent,
//   },
//   {
//     path: 'City/:id/update',
//     component: CityUpdateComponent,
//   },
//   {
//     path: 'Government/add',
//     component:CreateGovernmentComponent,
//   },
//   {
//     path: 'Government/list',
//     component: GovernmentListComponent,
//   },
//   {

//     path: 'government/:id/update',
//     component: EditGovernmentComponent,
//   },
//   {
//     path: 'branche/list',
//     component: BranchesListComponent,
//   },
//   {
//     path: 'branche/:id/edit',
//     component: BranchesUpdateComponent,
//   },
//   {
//     path: 'branche/add',
//     component: BrancheAddComponent,
//   },
//   {
//     path: 'Government/details',
//     component: GovernmentDetailsComponent,
//   },
//   {
//     path: 'Employee/list',
//     component: EmployeeListComponent,
//   },
//   {
//     path: 'Employee/add',
//     component: EmployeeAddComponent,
//   },
//   {
//     path: 'Employee/details',
//     component: EmployeeDetailsComponent,
//   },
//   {

//   // Cities
//   { path: 'cities', component: CityListComponent },
//   { path: 'city/add', component: CityAddComponent },
//   { path: 'city/update/:id', component: CityUpdateComponent },

//   // Governments
//   { path: 'governments', component: GovernmentListComponent },
//   { path: 'government/add', component: CreateGovernmentComponent },
//   { path: 'government/update/:id', component: GovernmentUpdateComponent },

//   // Reports
//   { path: 'order/report', component: OrderReportComponent },

//   //price
//   { path:'price', component:PricingListComponent},
//   { path:'price/edit/:id', component:PricingUpdateComponent},
//   { path:'price/add', component:PricingCreateComponent},
//   { path:'price/list' , component:PricingListComponent},

//   //branch
//   { path:'branch', component:BranchesListComponent},
//   { path:'branch/edit/:id', component:BranchesUpdateComponent},
//   { path:'branch/add', component:BrancheAddComponent}

// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}

