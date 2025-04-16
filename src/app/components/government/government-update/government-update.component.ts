import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GovernmentService } from '../../../services/government.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-government-update',
  templateUrl: './government-update.component.html',
  styleUrls: ['./government-update.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class GovernmentUpdateComponent implements OnInit {
  governmentForm!: FormGroup;
  isLoading = false;
  governmentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private governmentService: GovernmentService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.governmentId = this.route.snapshot.paramMap.get('id');
    if (this.governmentId) {
      this.loadGovernmentData();
    }
  }

  private initForm(): void {
    this.governmentForm = this.fb.group({
      GovernmentName: ['', [Validators.required, Validators.minLength(3)]],
      cost: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      pickupCost: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      status: ['', Validators.required],
    });
  }

  loadGovernmentData(): void {
    if (!this.governmentId) return;
    this.isLoading = true;
    this.governmentService.getGovernmentDetails(this.governmentId).subscribe({
      next: (government) => {
        this.governmentForm.patchValue({
          GovernmentName: government.GovernmentName,
          cost: government.cost,
          pickupCost: government.pickupCost,
          status: government.status,
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading government', err);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.governmentForm.invalid) {
      Object.values(this.governmentForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    if (this.governmentId) {
      const governmentData = this.governmentForm.value;
      this.updateGovernment(governmentData);
    }
  }

  updateGovernment(government: any): void {
    if (!this.governmentId) return;
    this.isLoading = true;
    this.governmentService.updateGovernment(this.governmentId, government).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/governments']);
      },
      error: (err) => {
        console.error('Error updating government', err);
        this.isLoading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/governments']);
  }
}