import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchesService, Branch } from '../../../services/branches.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-branche-update',
  templateUrl: './branche-update.component.html',
  styleUrls: ['./branche-update.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
})
export class BranchesUpdateComponent implements OnInit {
  branchForm!: FormGroup;
  isLoading = false;
  branchId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private branchesService: BranchesService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.branchId = this.route.snapshot.paramMap.get('id');
    if (this.branchId) {
      this.loadBranchData();
    }
  }

  private initForm(): void {
    this.branchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: ['', Validators.required],
    });
  }

  loadBranchData(): void {
    if (!this.branchId) return;
    this.isLoading = true;
    this.branchesService.getBranchDetails(this.branchId).subscribe({
      next: (branch) => {
        this.branchForm.patchValue({
          name: branch.name,
          status: branch.status,
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading branch', err);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.branchForm.invalid) {
      Object.values(this.branchForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    if (this.branchId) {
      const branchData = this.branchForm.value;
      this.updateBranch(branchData);
    }
  }

  updateBranch(branch: Partial<Branch>): void {
    if (!this.branchId) return;
    this.isLoading = true;
    this.branchesService.updateBranch(this.branchId, branch).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/branch']);
      },
      error: (err) => {
        console.error('Error updating branch', err);
        this.isLoading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/branch']);
  }
}