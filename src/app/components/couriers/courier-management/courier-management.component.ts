import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
interface Courier {
  id: string
  rider: string
  startWork: string
  finishWork: string
  averageWork: string
  totalOrder: string
  status: string
}
@Component({
  selector: 'app-courier-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './courier-management.component.html',
  styleUrls: ['./courier-management.component.scss'],
})

export class CourierManagementComponent implements OnInit {
  // Stats
  totalCouriers = 230
  activeCouriers = 225
  leaveSickCouriers = 2
  deactiveCouriers = 10

  loading = false
  searchQuery = ""
  selectedCouriers: Set<string> = new Set()

  // Sample data
  couriersData: Courier[] = [
    {
      id: "#RD-84579",
      rider: "Marvin McKinney",
      startWork: "09:00 am",
      finishWork: "10:00 pm",
      averageWork: "56 Hours",
      totalOrder: "324 Package",
      status: "Complete",
    },
    {
      id: "#RD-84579",
      rider: "Darrell Steward",
      startWork: "09:00 am",
      finishWork: "05:00 pm",
      averageWork: "80 Hours",
      totalOrder: "324 Package",
      status: "Pending",
    },
    {
      id: "#RD-84579",
      rider: "Jacob Jones",
      startWork: "09:00 am",
      finishWork: "07:00 pm",
      averageWork: "07:00 pm",
      totalOrder: "324 Package",
      status: "Complete",
    },
    {
      id: "#RD-84579",
      rider: "Kathryn Murphy",
      startWork: "09:00 am",
      finishWork: "07:00 pm",
      averageWork: "56 Hours",
      totalOrder: "324 Package",
      status: "Delivery",
    },
    {
      id: "#RD-84579",
      rider: "Courtney Henry",
      startWork: "09:00 am",
      finishWork: "07:00 pm",
      averageWork: "56 Hours",
      totalOrder: "324 Package",
      status: "Complete",
    },
    {
      id: "#RD-84579",
      rider: "Theresa Webb",
      startWork: "09:00 am",
      finishWork: "07:00 pm",
      averageWork: "56 Hours",
      totalOrder: "324 Package",
      status: "Complete",
    },
    {
      id: "#RD-84579",
      rider: "Eleanor Pena",
      startWork: "09:00 am",
      finishWork: "07:00 pm",
      averageWork: "56 Hours",
      totalOrder: "324 Package",
      status: "Delivery",
    },
    {
      id: "#RD-84579",
      rider: "Theresa Webb",
      startWork: "09:00 am",
      finishWork: "07:00 pm",
      averageWork: "56 Hours",
      totalOrder: "324 Package",
      status: "Complete",
    },
  ]

  filteredCouriers: Courier[] = []
  currentCourier: Courier | null = null

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadCouriers()
  }

  loadCouriers(): void {
    this.loading = true

    // Simulate API call
    setTimeout(() => {
      this.filteredCouriers = [...this.couriersData]
      this.loading = false
    }, 800)
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredCouriers = [...this.couriersData]
      return
    }

    const query = this.searchQuery.toLowerCase().trim()
    this.filteredCouriers = this.couriersData.filter(
      (courier) => courier.rider.toLowerCase().includes(query) || courier.id.toLowerCase().includes(query),
    )
  }

  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      this.filteredCouriers.forEach((courier) => this.selectedCouriers.add(courier.id))
    } else {
      this.selectedCouriers.clear()
    }
  }

  toggleSelectCourier(id: string, event: any): void {
    if (event.target.checked) {
      this.selectedCouriers.add(id)
    } else {
      this.selectedCouriers.delete(id)
    }
  }

  isSelected(id: string): boolean {
    return this.selectedCouriers.has(id)
  }

  addNewCourier(): void {
    this.router.navigate(["/couriers/create"])
  }

  // Action handlers
  viewCourier(courier: Courier): void {
    this.router.navigate(["/couriers/view", courier.id.replace("#", "")])
  }

  contactCourier(courier: Courier): void {
    this.snackBar.open(`Contacting ${courier.rider}...`, "Close", {
      duration: 3000,
    })
  }

  editCourier(courier: Courier): void {
    this.router.navigate(["/couriers/edit", courier.id.replace("#", "")])
  }

  deleteCourier(courier: Courier): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Courier",
        message: `Are you sure you want to delete ${courier.rider}?`,
        confirmText: "Delete",
        cancelText: "Cancel",
        isDangerous: true,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Simulate API call
        this.snackBar.open("Courier deleted successfully", "Close", {
          duration: 3000,
        })
        // Remove from list
        this.filteredCouriers = this.filteredCouriers.filter((c) => c.id !== courier.id)
        this.couriersData = this.couriersData.filter((c) => c.id !== courier.id)
      }
    })
  }

  getStatusClass(status: string): string {
    status = status.toLowerCase()
    if (status === "complete") return "status-complete"
    if (status === "pending") return "status-pending"
    if (status === "delivery") return "status-delivery"
    return ""
  }

  applyFilter(): void {
    // Implement filter functionality
    console.log("Filter applied")
  }
}
