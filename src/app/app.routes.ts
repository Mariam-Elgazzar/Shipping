import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { DeliveryDashboardComponent } from './components/delivery/delivery-dashboard/delivery-dashboard.component';
import { RoleGuard } from './guards/role.guard';
import { MerchantListComponent } from './components/Merchants/merchant-list/merchant-list.component';
import { EmployeeComponent } from './components/Employee/emplyee-list/employee-list.component';
import { PermissionsMatrixComponent } from './components/admin/permissions/permissions-matrix/permissions-matrix.component';
import { UnauthorizedComponent } from './components/shared/unauthorized/unauthorized.component';
import { NgModule } from '@angular/core';
import { DeliveryListComponent } from './components/Deliveries/delivery-list/delivery-list.component';
import { MerchantFormComponent } from './components/Merchants/add-merchant/merchant.component';
import { OrderDashboardComponent } from './components/order/order-dashboard.component';
import { RolesListComponent } from './components/admin/roles/roles-list/roles-list.component';
import { RejectionReasonService } from './services/rejectionReason.service';
import { AddOrderModalComponent } from './components/order/add-order-modal/add-order-modal.component';
import { CreateCityComponent } from './components/city/create-city/create-city.component';
import { CityListComponent } from './components/city/city-list/city-list.component';
import { AccessGuard } from './guards/access.guard';
import { BranchesListComponent } from './components/branches/branches-list/branches-list.component';
import { BrancheAddComponent } from './components/branches/branche-add/branche-add.component';
import { DisplayReasonsComponent } from './components/RejectionReason/display-reasons/display-reasons.component';
import { CreateReasonComponent } from './components/RejectionReason/create-reason/create-reason.component';
import { UpdateReasonComponent } from './components/RejectionReason/update-reason/update-reason.component';
import { BranchesUpdateComponent } from './components/branches/branche-update/branche-update.component';
import { DeliveryFormComponent } from './components/Deliveries/add-delivery/delivery.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PricingListComponent } from './components/price/pricing-list/pricing-list.component';
import { PricingAddComponent } from './components/price/pricing-create/pricing-create.component';
import { GovernmentListComponent } from './components/government/government-list/government-list.component';
import { CreateGovernmentComponent } from './components/government/create-government/create-government.component';
import { OrderReportComponent } from './components/reports/order-report.component';
import { ChatComponent } from './components/ai-chat/ai-chat.component';
import { EmployeeAddComponent } from './components/Employee/employee-add/employee-add.component';
import { PricingUpdateComponent } from './components/price/pricing-update/pricing-update.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: '', redirectTo: 'login-form', pathMatch: 'full' },
      { path: 'login-form', component: LoginFormComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'change-password', component: ChangePasswordComponent },
    ],
  },
  {
    path: 'add-permission',
    component: PermissionsMatrixComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  {
    path: 'admin/roles',
    component: PermissionsMatrixComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  {
    path: 'Employee/list',
    component: EmployeeComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  {
    path: 'Employee/add',
    component: EmployeeAddComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  //#region Rejection Reason
  {
    path: 'rejectionReason/display',
    component: DisplayReasonsComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  {
    path: 'rejectionReason/create',
    component: CreateReasonComponent,
  },

  {
    path: 'rejectionReason/edit/:id',
    component: UpdateReasonComponent,
  },
  //#endregion

  //#region chat
  { path: 'chat', component: ChatComponent },

  //#endregion
  //#region Branches
  {
    path: 'Branchs',
    component: BranchesListComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  {
    path: 'branches/add',
    component: BrancheAddComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  {
    //branches/1/edit
    path: 'branches/:id/edit',
    component: BranchesUpdateComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  //#endregion
  //#region City
  {
    path: 'city/add',
    component: CreateCityComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  {
    path: 'city/list',
    component: CityListComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  {
    path: 'city/edit/:id',
    component: CreateCityComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  //#endregion
  //#region Merchant
  {
    path: 'merchants/create',
    component: MerchantFormComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  {
    path: 'merchants/edit/:id',
    component: MerchantFormComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', , 'Employee'] },
  },
  {
    path: 'merchant/list',
    component: MerchantListComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', , 'Employee'] },
  },
  //#endregion

  //#region delivery
  {
    path: 'delivery',
    component: DeliveryDashboardComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Delivary'] },
  },
  {
    path: 'delivery-reps/add',
    component: DeliveryFormComponent,
  },
  {
    path: 'delivery-reps',
    component: DeliveryListComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'delivery-reps/edit/:id',
    component: DeliveryFormComponent,

    canActivate: [AccessGuard],
    data: { roles: ['Admin'] },
  },
  //#endregion

  //#region Orders
  {
    path: 'orders',
    component: OrderDashboardComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Merchant', 'Employee'] },
  },

  //#endregion

  //#region government
  {
    path: 'Government/list',
    component: GovernmentListComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  {
    path: 'Government/add',
    component: CreateGovernmentComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Employee'] },
  },
  {
    path: 'governments/edit/:id',
    component: CreateGovernmentComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin'] },
  },
  //#endregion
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin', 'Merchant', 'Delivary', 'Employee'] },
  },
  //#region priceing
  {
    path: 'pricings',
    component: PricingListComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'pricings/:id/edit',
    component: PricingUpdateComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Admin'] },
  },
  //#endregion
  {
    path: 'reports/orders',
    component: OrderReportComponent,
    canActivate: [AccessGuard],
    data: { roles: ['Delivary', 'Admin', 'Merchant'] },
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'reset-password',
    redirectTo: 'login/reset-password',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/login', //sometimes referred to as the default route since this is the default route if the user just hits the base URL for the website (e.g., http://www.example.com/) redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
