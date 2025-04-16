// create-reason.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RejectionReasonService } from '../../../services/rejectionReason.service';
import { CreateRejectionReasonResponse, RejectionReasonRequest, RejectionReasonRequestCreate } from '../../../models/rejection-reason.model';

@Component({
  selector: 'app-create-reason',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './create-reason.component.html',
  styleUrls: ['./create-reason.component.scss'],
})
export class CreateReasonComponent implements OnInit {
  reasonForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private rejectionReasonService: RejectionReasonService,
    private router: Router
  ) {
    this.reasonForm = this.fb.group({
      reason: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
          Validators.pattern(/^\S.*\S$/),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  get reasonControl() {
    return this.reasonForm.get('reason');
  }

  onSubmit(): void {
    if (this.reasonForm.invalid) {
      this.reasonForm.markAllAsTouched();
      this.errorMessage = 'الرجاء التأكد من إدخال سبب صحيح (5-200 حرف)';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const request: RejectionReasonRequestCreate = {
      text: this.reasonForm.value.reason.trim(),
    };

    console.log('إرسال الطلب:', request);

    this.rejectionReasonService.createRejectionReason(request).subscribe({
      next: (response: any) => {
        console.log('تم الحفظ بنجاح، المعرف:', response.id);
        this.loading = false;
        this.router.navigate(['/rejection-reasons']);
      },
      error: (err) => {
        console.log('تم الحفظ بنجاح، المعرف:');
        this.loading = false;
        this.router.navigate(['/rejection-reasons']);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/reject']);
  }
}
