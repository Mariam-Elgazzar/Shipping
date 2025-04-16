// edit-reason.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RejectionReasonService } from '../../../services/rejectionReason.service';
import { RejectionReasonRequest, RejectionReasonResponse } from '../../../models/rejection-reason.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-reason',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './edit-reason.component.html',
  styleUrls: ['./edit-reason.component.scss'],
})
export class EditReasonComponent implements OnInit {
  reasonForm: FormGroup;
  loading = false;
  errorMessage = '';
  reasonId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private rejectionReasonService: RejectionReasonService,
    private router: Router,
    private route: ActivatedRoute
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

  // ngOnInit(): void {
  //   this.route.paramMap
  //     .pipe(
  //       switchMap((params) => {
  //         const id = params.get('id');
  //         if (id) {
  //           this.reasonId = +id;
  //           return this.rejectionReasonService.getRejectionReasonById(this.reasonId);
  //         }
  //         return of(null);
  //       })
  //     )
  //     .subscribe({
  //       next: (reason) => {
  //         console.log('رد الـ API:', reason); // اطبع الرد عشان تشوف شكله
  //         if (reason?.text) {
  //           this.reasonForm.patchValue({ reason: reason.text });
  //         } else {
  //           this.errorMessage = 'لم يتم العثور على السبب';
  //           this.router.navigate(['/reject']);
  //         }
  //       },
  //       error: (err) => {
  //         console.error('تفاصيل الخطأ:', err);
  //         this.errorMessage = 'فشل في تحميل السبب: ' + (err.message || 'خطأ غير معروف');
  //       }
  //     });
  // }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (!id || isNaN(+id)) {
            this.errorMessage = 'معرف السبب غير صالح';
            this.router.navigate(['/reject']);
            return of(null);
          }
          this.reasonId = +id;
          console.log('الـ ID:', this.reasonId); // اطبع الـ id عشان تتأكد منه
          return this.rejectionReasonService.getRejectionReasonById(this.reasonId);
        })
      )
      .subscribe({
        next: (reason) => {
          console.log('رد الـ API:', reason);
          if (reason?.text) {
            this.reasonForm.patchValue({ reason: reason.text });
          } else {
            this.errorMessage = 'لم يتم العثور على السبب';
            this.router.navigate(['/reject']);
          }
        },
        error: (err) => {
          console.error('تفاصيل الخطأ:', err);
          this.errorMessage = 'فشل في تحميل السبب: ' + (err.message || 'خطأ غير معروف');
        }
      });
  }
  get reasonControl() {
    return this.reasonForm.get('reason');
  }

  onSubmit(): void {
    if (this.reasonForm.invalid) {
      this.reasonForm.markAllAsTouched();
      this.errorMessage = 'الرجاء التأكد من إدخال سبب صحيح (5-200 حرف)';
      return;
    }

    if (!this.reasonId) {
      this.errorMessage = 'معرف السبب غير موجود';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const request: RejectionReasonRequest = {
      id: this.reasonId,
      text: this.reasonForm.value.reason.trim(),
    };

    console.log('إرسال الطلب:', request);

    this.rejectionReasonService.updateRejectionReason(request).subscribe({
      next: (response: RejectionReasonResponse) => {
        console.log('تم التعديل بنجاح:', response);
        this.loading = false;
        this.router.navigate(['/reject']);
      },
      error: (err) => {
        console.error('فشل التعديل:', err);
        this.errorMessage = err.message || 'فشل في تعديل سبب الرفض. تحقق من الاتصال.';
        this.loading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/reject']);
  }
}
