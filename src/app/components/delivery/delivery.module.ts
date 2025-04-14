import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './delivery.component';

const routes: Routes = [{ path: '', component: DeliveryComponent }];
 
@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule,DeliveryComponent,ReactiveFormsModule],  
  exports: [DeliveryComponent],   
  
})

export class DeliveryModule {}
