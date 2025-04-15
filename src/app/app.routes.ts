import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Auth
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

// Dashboard
// import { DashboardComponent } from './components/dashboard/dashboard.component';

// Employee
import { EmployeeAddComponent } from './components/Employee/employee-add/employee-add.component';
import { EmployeeListComponent } from './components/Employee/emplyee-list/employee-list.component';
import { EmployeeUpdateComponent } from './components/Employee/employee-update/employee-update.component';

// Merchant
import { MerchantFormComponent } from './components/Merchants/add-merchant/merchant.component';
import { MerchantUpdateComponent } from './components/Merchants/merchant-update/merchant-update.component';
import { MerchantListComponent } from './components/Merchants/merchant-list/merchant-list.component';

// Role & Permission
// import { RoleListComponent } from './components/role-permission/role-list/role-list.component';
// import { RoleAddComponent } from './components/role-permission/role-add/role-add.component';
// import { RoleEditComponent } from './components/role-permission/role-edit/role-edit.component';
// import { PermissionListComponent } from './components/role-permission/permission-list/permission-list.component';
// import { PermissionAddComponent } from './components/role-permission/permission-add/permission-add.component';
// import { PermissionEditComponent } from './components/role-permission/permission-edit/permission-edit.component';

// Orders & Delivery
import { OrderDashboardComponent } from './components/order/order-dashboard.component';
import { DeliveryComponent } from './components/Deliveries/add-delivery/delivery.component';
import { DeliveryUpdateComponent } from './components/Deliveries/delivery-update/delivery-update.component';

// Settings
// import { SettingComponent } from './components/settings/setting/setting.component';
// import { AddSettingComponent } from './components/settings/add-setting/add-setting.component';
// import { EditSettingComponent } from './components/settings/edit-setting/edit-setting.component';

// City & Government
import { CityListComponent } from './components/city/city-list/city-list.component';
import { CityAddComponent } from './components/city/city-add/city-add.component';
import { CityUpdateComponent } from './components/city/city-update/city-update.component';
import { CreateGovernmentComponent } from './components/government/create-government/create-government.component';
import { GovernmentListComponent } from './components/government/government-list/government-list.component';
import { GovernmentUpdateComponent } from './components/government/government-update/government-update.component';

// Reports
import { OrderReportComponent } from './components/reports/order-report.component';
import { RolesListComponent } from './components/admin/roles/roles-list/roles-list.component';
import { PermissionsListComponent } from './components/admin/permissions/permission-list/permissions-list.component';
import { AddPermissionComponent } from './components/admin/permissions/add-permission/add-permission.component';
import { PermissionsMatrixComponent } from './components/admin/permissions/permissions-matrix/permissions-matrix.component';

//price
import { PricingListComponent } from './components/price/pricing-list/pricing-list.component';
import { PricingUpdateComponent } from './components/price/pricing-update/pricing-update.component';
import { PricingCreateComponent } from './components/price/pricing-create/pricing-create.component';
import { BranchesListComponent } from './components/branches/branches-list/branches-list.component';
import { BranchesUpdateComponent } from './components/branches/branche-update/branche-update.component';
import { BrancheAddComponent } from './components/branches/branche-add/branche-add.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // Dashboard
  // { path: 'dashboard', component: DashboardComponent },

  // Employees
  { path: 'employee/list', component: EmployeeListComponent },
  { path: 'employee/add', component: EmployeeAddComponent },
  { path: 'employee/update/:id', component: EmployeeUpdateComponent },

  // Merchants
  { path: 'merchant/list', component: MerchantListComponent },
  { path: 'merchant/add', component: MerchantFormComponent },
  { path: 'merchant/update/:id', component: MerchantUpdateComponent },

  // Roles & Permissions
  { path: 'roles', component: RolesListComponent },
  // { path: 'role/add', component: RoleAddComponent },
  // { path: 'role/edit/:id', component: RoleEditComponent },
  { path: 'permission', component: PermissionsListComponent },
  { path: 'permission/add', component: AddPermissionComponent },
  // { path: 'permission/edit/:id', component: PermissionEditComponent },
  {path: 'permissions-matrix',component: PermissionsMatrixComponent},
  
  // Orders & Deliveries
  { path: 'orders', component: OrderDashboardComponent },
  { path: 'deliveries', component: DeliveryComponent },
  { path: 'delivery/update/:id', component: DeliveryUpdateComponent },

  // Settings
  // { path: 'settings', component: SettingComponent },
  // { path: 'setting/add', component: AddSettingComponent },
  // { path: 'setting/edit/:id', component: EditSettingComponent },

  // Cities
  { path: 'cities', component: CityListComponent },
  { path: 'city/add', component: CityAddComponent },
  { path: 'city/update/:id', component: CityUpdateComponent },

  // Governments
  { path: 'governments', component: GovernmentListComponent },
  { path: 'government/add', component: CreateGovernmentComponent },
  { path: 'government/update/:id', component: GovernmentUpdateComponent },

  // Reports
  { path: 'order/report', component: OrderReportComponent },

  //price
  { path:'price', component:PricingListComponent},
  { path:'price/edit/:id', component:PricingUpdateComponent},
  { path:'price/add', component:PricingCreateComponent},
  { path:'price/list' , component:PricingListComponent},

  //branch
  { path:'branch', component:BranchesListComponent},
  { path:'branch/edit/:id', component:BranchesUpdateComponent},
  { path:'branch/add', component:BrancheAddComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
