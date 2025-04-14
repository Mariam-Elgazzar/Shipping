import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MerchantService } from '../../../services/merchant.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-merchant-update',
  templateUrl: './merchant-update.component.html',
  styleUrls: ['./merchant-update.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class MerchantUpdateComponent implements OnInit {
  merchantForm!: FormGroup;
  isLoading = false;
  merchantId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.merchantId = this.route.snapshot.paramMap.get('id');
    if (this.merchantId) {
      this.loadMerchantData();
    }
  }

  private initForm(): void {
    this.merchantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      branchLocation: ['', Validators.required],
      branchName: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  loadMerchantData(): void {
    if (!this.merchantId) return;
    this.isLoading = true;
    this.merchantService.getMerchantDetails(this.merchantId).subscribe({
      next: (merchant) => {
        this.merchantForm.patchValue({
          name: merchant.name,
          email: merchant.email,
          phone: merchant.phone,
          branchLocation: merchant.branchLocation,
          branchName: merchant.branchName,
          status: merchant.status,
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading merchant', err);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.merchantForm.invalid) {
      Object.values(this.merchantForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    if (this.merchantId) {
      const merchantData = this.merchantForm.value;
      this.updateMerchant(merchantData);
    }
  }

  updateMerchant(merchant: any): void {
    if (!this.merchantId) return;
    this.isLoading = true;
    this.merchantService.updateMerchant(this.merchantId, merchant).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/merchants']);
      },
      error: (err) => {
        console.error('Error updating merchant', err);
        this.isLoading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/merchants']);
  }
}