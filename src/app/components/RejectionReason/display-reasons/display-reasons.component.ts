import { Component,  OnInit } from "@angular/core"
import { Router } from "@angular/router"
import  { MatDialog } from "@angular/material/dialog"
import  { MatSnackBar } from "@angular/material/snack-bar"
import { CommonModule } from "@angular/common"
import { MatSpinner } from "@angular/material/progress-spinner"
import { MatIcon } from "@angular/material/icon"
import { FormsModule } from "@angular/forms"
import { RejectionReasonService } from "../../../services/rejectionReason.service"
import { RejectionReason } from "../../../models/rejection-reason.model"
import { finalize } from "rxjs/operators"

@Component({
  selector: "app-display-reasons",
  templateUrl: "./display-reasons.component.html",
  styleUrls: ["./display-reasons.component.scss"],
  imports: [CommonModule, MatIcon, MatSpinner, FormsModule],
  standalone: true,
})
export class DisplayReasonsComponent implements OnInit {
  loading = false
  searchQuery = ""
  reasons: RejectionReason[] = []
  filteredReasons: RejectionReason[] = []

  // Add properties for confirmation dialog
  showConfirmDialog = false
  reasonToDelete: { id: string; reason: string } | null = null

  constructor(
    private rejectionReasonService: RejectionReasonService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadReasons()
  }

  loadReasons(): void {
    this.loading = true

    this.rejectionReasonService
      .getReasons()
      .pipe(
        finalize(() => {
          this.loading = false
        }),
      )
      .subscribe({
        next: (response) => {
          this.reasons = response.data.reasons
          this.filteredReasons = [...this.reasons]
        },
        error: (error) => {
          this.snackBar.open("Failed to load rejection reasons: " + error.message, "Close", {
            duration: 5000,
          })
        },
      })
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredReasons = [...this.reasons]
      return
    }

    const query = this.searchQuery.toLowerCase().trim()
    this.filteredReasons = this.reasons.filter((reason) => reason.reason.toLowerCase().includes(query))
  }

  addReason(): void {
    this.router.navigate(["rejectionReason/create"])
  }

  viewReason(reason: RejectionReason): void {
    // You can implement view functionality here
    // For example, show a modal with details or navigate to a details page
    console.log("View reason:", reason)
  }

  editReason(id: string): void {
    this.router.navigate([`rejectionReason/edit/${id}`])
  }

  // Update the delete method to show the confirmation dialog
  confirmDeleteReason(reason: RejectionReason): void {
    this.reasonToDelete = { id: reason.id!, reason: reason.reason }
    this.showConfirmDialog = true
  }

  // Add methods to handle confirmation dialog actions
  cancelDelete(): void {
    this.showConfirmDialog = false
    this.reasonToDelete = null
  }

  confirmDelete(): void {
    if (!this.reasonToDelete) return

    const id = this.reasonToDelete.id
    this.showConfirmDialog = false
    this.reasonToDelete = null

    this.loading = true
    this.rejectionReasonService
      .deleteReason(id)
      .pipe(
        finalize(() => {
          this.loading = false
        }),
      )
      .subscribe({
        next: () => {
          this.snackBar.open("Rejection reason deleted successfully", "Close", {
            duration: 3000,
          })
          // Update the local lists after deletion
          this.reasons = this.reasons.filter((r) => r.id !== id)
          this.filteredReasons = this.filteredReasons.filter((r) => r.id !== id)
        },
        error: (error) => {
          this.snackBar.open("Failed to delete rejection reason: " + error.message, "Close", {
            duration: 5000,
          })
        },
      })
  }

  formatDate(date: Date | undefined): string {
    if (!date) return "-"
    const d = new Date(date)

    // Format: HH:MM:SS YYYY-MM-DD
    const time = d.toTimeString().split(" ")[0]
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")

    return `${time} ${year}-${month}-${day}`
  }
}
