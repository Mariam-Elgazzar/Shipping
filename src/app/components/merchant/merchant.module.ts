import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { CommonModule } from '@angular/common'; 
import { MerchantComponent } from "./merchant.component";  // استيراد الكومبوننت

const routes: Routes = [{ path: "", component: MerchantComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule,MerchantComponent],  // فقط استيراد الموديولات المطلوبة
  exports: [MerchantComponent],  // لا حاجة لإضافته إلى `declarations` إذا كان standalone
})
export class MerchantModule {}

