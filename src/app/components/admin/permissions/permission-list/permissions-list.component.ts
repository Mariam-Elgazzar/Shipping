import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
interface Permission {
  id: number;
  name: string;
  dateAdded: string;
}

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss'],
  imports: [
    ConfirmDialogComponent,
    CommonModule,
    MatIcon,
    MatSpinner,
    FormsModule,
  ],
})
export class PermissionsListComponent implements OnInit {
  loading = false;
  searchQuery = '';

  // Pagination
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];

  permissions: Permission[] = [
    {
      id: 1,
      name: 'Manager',
      dateAdded: '14:03:47 2020-11-05',
    },
    {
      id: 2,
      name: 'Driver',
      dateAdded: '13:50:21 2020-12-08',
    },
    {
      id: 3,
      name: 'Super Driver',
      dateAdded: '16:03:14 2020-12-15',
    },
    {
      id: 4,
      name: 'Branch Manager',
      dateAdded: '14:02:23 2021-05-10',
    },
    {
      id: 5,
      name: 'Security Officer',
      dateAdded: '18:36:52 2022-06-04',
    },
    {
      id: 6,
      name: 'Accountant',
      dateAdded: '14:46:48 2023-02-07',
    },
  ];

  filteredPermissions: Permission[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.loading = true;

    // In a real app, this would be an API call
    setTimeout(() => {
      this.filteredPermissions = [...this.permissions];
      this.loading = false;
    }, 800);
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredPermissions = [...this.permissions];
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPermissions = this.permissions.filter((permission) =>
      permission.name.toLowerCase().includes(query)
    );
  }

  addPermission(): void {
    this.router.navigate(['/add-permission']);
  }

  viewPermission(permission: Permission): void {
    this.router.navigate(['/permission-matrix', permission.id]);
  }

  editPermission(permission: Permission): void {
    this.router.navigate(['/admin/permissions/edit', permission.id]);
  }

  deletePermission(permission: Permission): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Permission',
        message: `Are you sure you want to delete "${permission.name}" permission?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDangerous: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // In a real app, this would be an API call
        this.filteredPermissions = this.filteredPermissions.filter(
          (p) => p.id !== permission.id
        );
        this.permissions = this.permissions.filter(
          (p) => p.id !== permission.id
        );

        this.snackBar.open('Permission deleted successfully', 'Close', {
          duration: 3000,
        });
      }
    });
  }
}
