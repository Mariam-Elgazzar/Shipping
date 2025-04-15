import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { MatSnackBar } from "@angular/material/snack-bar"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { RejectionReasonService } from "../../../services/rejectionReason.service"
import { finalize } from "rxjs/operators"
import { RejectionReason } from "../../../models/rejection-reason.model"

@Component({
  selector: "app-update-reason",
  templateUrl: "./update-reason.component.html",
  styleUrls: ["./update-reason.component.scss"],
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
export class UpdateReasonComponent implements OnInit {
  reasonForm!: FormGroup
  loading = false
  loadingData = true
  reasonId: string | null = null

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private rejectionReasonService: RejectionReasonService,
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.reasonId = this.route.snapshot.paramMap.get("id")

    if (!this.reasonId) {
      this.snackBar.open("Rejection reason ID is missing", "Close", {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      })
      this.goBack()
      return
    }

    this.loadReasonData()
  }

  initForm(): void {
    this.reasonForm = this.fb.group({
      reason: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    })
  }

  loadReasonData(): void {
    this.loadingData = true

    this.rejectionReasonService
      .getReasonById(this.reasonId!)
      .pipe(
        finalize(() => {
          this.loadingData = false
        }),
      )
      .subscribe({
        next: (response) => {
          const reason = response.data as RejectionReason
          this.reasonForm.patchValue({
            reason: reason.reason,
          })
        },
        error: (error) => {
          this.snackBar.open("Failed to load rejection reason: " + error.message, "Close", {
            duration: 5000,
            horizontalPosition: "center",
            verticalPosition: "bottom",
          })
          this.goBack()
        },
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
      .updateReason(this.reasonId!, reasonData)
      .pipe(
        finalize(() => {
          this.loading = false
        }),
      )
      .subscribe({
        next: () => {
          this.snackBar.open("Rejection reason updated successfully!", "Close", {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "bottom",
          })
          this.goBack()
        },
        error: (error) => {
          this.snackBar.open(error.message || "Failed to update rejection reason", "Close", {
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

