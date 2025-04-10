import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../../../../services/role.service';
import { Role } from '../../../../models/user.model';
import { RoleFormDialogComponent } from '../role-form-dialog/role-form-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class RolesListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'permissionsCount',
    'updatedAt',
    'actions',
  ];
  dataSource!: MatTableDataSource<Role>;
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private roleService: RoleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.loading = true;
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.dataSource = new MatTableDataSource(roles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open('Failed to load roles', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
        this.loading = false;
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openRoleForm(role?: Role): void {
    const dialogRef = this.dialog.open(RoleFormDialogComponent, {
      width: '600px',
      data: { role },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRoles();
      }
    });
  }

  deleteRole(role: Role): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Role',
        message: `Are you sure you want to delete the role "${role.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.roleService.deleteRole(role.id).subscribe({
          next: () => {
            this.snackBar.open('Role deleted successfully', 'Close', {
              duration: 3000,
            });
            this.loadRoles();
          },
          error: (error) => {
            this.snackBar.open('Failed to delete role', 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
          },
        });
      }
    });
  }
}
