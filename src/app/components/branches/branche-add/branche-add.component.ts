import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchesService } from '../../../services/branches.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-branche-add',
  templateUrl: './branche-add.component.html',
  styleUrls: ['./branche-add.component.scss'],
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
export class BrancheAddComponent implements OnInit {
  branchForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private branchesService: BranchesService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.branchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.branchForm.invalid) {
      Object.values(this.branchForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    const branchData = this.branchForm.value;
    this.createBranch(branchData);
  }

  createBranch(branch: { name: string; status: string }): void {
    this.isLoading = true;
    this.branchesService.createBranch(branch).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/branches']);
      },
      error: (err) => {
        console.error('Error creating branch', err);
        this.isLoading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/branches']);
  }
}