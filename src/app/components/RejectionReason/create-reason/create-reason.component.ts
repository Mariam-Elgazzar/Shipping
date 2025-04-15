import { Component, OnInit } from "@angular/core"
import { FormBuilder,  FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { MatSnackBar } from "@angular/material/snack-bar"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import  { RejectionReasonService } from "../../../services/rejectionReason.service"
import { finalize } from "rxjs/operators"

@Component({
  selector: "app-create-reason",
  templateUrl: "./create-reason.component.html",
  styleUrls: ["./create-reason.component.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  standalone: true,
})
export class CreateReasonComponent implements OnInit {
  reasonForm!: FormGroup
  loading = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private rejectionReasonService: RejectionReasonService,
  ) {}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.reasonForm = this.fb.group({
      reason: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    })
  }

  onSubmit(): void {
    if (this.reasonForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.reasonForm.controls).forEach((key) => {
        const control = this.reasonForm.get(key)
        control?.markAsTouched()
      })
      return
    }

    this.loading = true
    const reasonData = {
      reason: this.reasonForm.value.reason.trim(),
    }

    this.rejectionReasonService
      .createReason(reasonData)
      .pipe(
        finalize(() => {
          this.loading = false
        }),
      )
      .subscribe({
        next: () => {
          this.snackBar.open("Rejection reason created successfully!", "Close", {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "bottom",
          })
          this.goBack()
        },
        error: (error) => {
          this.snackBar.open(error.message || "Failed to create rejection reason", "Close", {
            duration: 5000,
            horizontalPosition: "center",
            verticalPosition: "bottom",
          })
        },
      })
  }

  goBack(): void {
    this.router.navigate(["rejectionReason/display"])
  }

  // Helper method for form validation
  get reasonControl() {
    return this.reasonForm.get("reason")
  }
}

