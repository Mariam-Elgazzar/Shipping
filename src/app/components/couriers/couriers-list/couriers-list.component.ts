import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
// import   { MatSnackBar } from "@angular/material/snack-bar"
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../../services/auth.service';
// import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../shared/data-table/data-table.component';

interface Courier {
  id: string;
  rider: string;
  startWork: string;
  finishWork: string;
  averageWork: string;
  totalOrder: string;
  status: string;
}

@Component({
  selector: 'app-couriers-list',
  templateUrl: './couriers-list.component.html',
  styleUrls: ['./couriers-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    DataTableComponent,
  ],
})
export class CouriersListComponent implements OnInit {
  tableTitle = 'Courier';
  loading = false;

  // Stats
  totalCouriers = 230;
  activeCouriers = 225;
  inactiveCouriers = 2;
  deactiveCouriers = 10;

  // Table configuration
  tableColumns = [
    { key: 'id', label: 'Id' },
    { key: 'rider', label: 'Rider', primary: true },
    { key: 'startWork', label: 'Start Work' },
    { key: 'finishWork', label: 'Finish Work' },
    { key: 'averageWork', label: 'Average Work' },
    { key: 'totalOrder', label: 'Total Order' },
    { key: 'status', label: 'Status' },
  ];

  // Action permissions
  actionPermissions = {
    view: 'couriers:view',
    edit: 'couriers:edit',
    delete: 'couriers:delete',
    contact: 'couriers:contact',
  };

  // Sample data
  couriersData: Courier[] = [
    {
      id: 'RID-84579',
      rider: 'Marvin McKinney',
      startWork: '09:00 am',
      finishWork: '10:00 pm',
      averageWork: '96 Hours',
      totalOrder: '324 Package',
      status: 'Complete',
    },
    {
      id: 'RID-84579',
      rider: 'Darrell Steward',
      startWork: '09:00 am',
      finishWork: '05:00 pm',
      averageWork: '80 Hours',
      totalOrder: '324 Package',
      status: 'Pending',
    },
    {
      id: 'RID-84579',
      rider: 'Jacob Jones',
      startWork: '09:00 am',
      finishWork: '07:00 pm',
      averageWork: '96 Hours',
      totalOrder: '324 Package',
      status: 'Complete',
    },
    {
      id: 'RID-84579',
      rider: 'Kathryn Murphy',
      startWork: '09:00 am',
      finishWork: '07:00 pm',
      averageWork: '96 Hours',
      totalOrder: '324 Package',
      status: 'Delivery',
    },
    {
      id: 'RID-84579',
      rider: 'Courtney Henry',
      startWork: '09:00 am',
      finishWork: '07:00 pm',
      averageWork: '96 Hours',
      totalOrder: '324 Package',
      status: 'Complete',
    },
    {
      id: 'RID-84579',
      rider: 'Theresa Webb',
      startWork: '09:00 am',
      finishWork: '07:00 pm',
      averageWork: '96 Hours',
      totalOrder: '324 Package',
      status: 'Complete',
    },
    {
      id: 'RID-84579',
      rider: 'Eleanor Pena',
      startWork: '09:00 am',
      finishWork: '07:00 pm',
      averageWork: '96 Hours',
      totalOrder: '324 Package',
      status: 'Delivery',
    },
    {
      id: 'RID-84579',
      rider: 'Theresa Webb',
      startWork: '09:00 am',
      finishWork: '07:00 pm',
      averageWork: '96 Hours',
      totalOrder: '324 Package',
      status: 'Complete',
    },
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCouriers();
  }

  loadCouriers(): void {
    this.loading = true;

    // Simulate API call
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onSearch(query: string): void {
    console.log('Search query:', query);
    // Implement search functionality
  }

  onFilter(): void {
    console.log('Filter clicked');
    // Implement filter functionality
  }

  addNewCourier(): void {
    this.router.navigate(['/couriers/create']);
  }

  // Action handlers
  onViewCourier(courier: Courier): void {
    console.log('View courier:', courier);
    this.router.navigate(['/couriers', courier.id]);
  }

  onEditCourier(courier: Courier): void {
    console.log('Edit courier:', courier);
    this.router.navigate(['/couriers/edit', courier.id]);
  }

  onDeleteCourier(courier: Courier): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Courier',
        message: `Are you sure you want to delete ${courier.rider}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDangerous: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Simulate API call
        this.snackBar.open('Courier deleted successfully', 'Close', {
          duration: 3000,
        });
        // Reload data
        this.loadCouriers();
      }
    });
  }

  onContactCourier(courier: Courier): void {
    console.log('Contact courier:', courier);
    this.snackBar.open(`Contacting ${courier.rider}...`, 'Close', {
      duration: 3000,
    });
  }

  getStatusClass(status: string): string {
    status = status.toLowerCase();
    if (status === 'complete') return 'status-complete';
    if (status === 'pending') return 'status-pending';
    if (status === 'delivery') return 'status-delivery';
    return '';
  }
}
