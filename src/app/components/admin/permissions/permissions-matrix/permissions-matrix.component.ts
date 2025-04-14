import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

interface PermissionModule {
  id: number;
  name: string;
  permissions: {
    view: boolean;
    edit: boolean;
    delete: boolean;
    add: boolean;
  };
}

@Component({
  selector: 'app-permissions-matrix',
  templateUrl: './permissions-matrix.component.html',
  styleUrls: ['./permissions-matrix.component.scss'],
  imports: [
    CommonModule,
    MatIcon,
    MatSpinner,
    FormsModule,
    MatCheckbox,
    RouterLink,
  ],
})
export class PermissionsMatrixComponent implements OnInit {
  loading = false;
  searchQuery = '';
  selectedRoleId: string | null = null;
  roleName = 'Administrator';

  // Pagination
  pageSize = 100;
  pageSizeOptions = [10, 25, 50, 100];

  // Permission modules
  permissionModules: PermissionModule[] = [
    {
      id: 1,
      name: 'Permissions',
      permissions: { view: true, edit: false, delete: false, add: false },
    },
    {
      id: 2,
      name: 'Settings',
      permissions: { view: true, edit: true, delete: false, add: false },
    },
    {
      id: 3,
      name: 'Banks',
      permissions: { view: true, edit: false, delete: false, add: false },
    },
    {
      id: 4,
      name: 'Inventory',
      permissions: { view: true, edit: false, delete: false, add: false },
    },
    {
      id: 5,
      name: 'Orders',
      permissions: { view: true, edit: false, delete: false, add: false },
    },
    {
      id: 6,
      name: 'Employees',
      permissions: { view: true, edit: false, delete: false, add: false },
    },
    {
      id: 7,
      name: 'Merchants',
      permissions: { view: true, edit: true, delete: false, add: false },
    },
    {
      id: 8,
      name: 'Offices',
      permissions: { view: true, edit: false, delete: false, add: false },
    },
    {
      id: 9,
      name: 'Governorates',
      permissions: { view: true, edit: true, delete: false, add: false },
    },
    {
      id: 10,
      name: 'Cities',
      permissions: { view: true, edit: true, delete: false, add: false },
    },
    {
      id: 11,
      name: 'Operations',
      permissions: { view: true, edit: true, delete: false, add: true },
    },
    {
      id: 12,
      name: 'Accounts',
      permissions: { view: true, edit: false, delete: false, add: false },
    },
    {
      id: 13,
      name: 'Operations Reports',
      permissions: { view: true, edit: true, delete: false, add: true },
    },
  ];

  filteredModules: PermissionModule[] = [];

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.loading = true;

    // In a real app, this would be an API call to get permissions for the selected role
    setTimeout(() => {
      this.filteredModules = [...this.permissionModules];
      this.loading = false;
    }, 800);
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredModules = [...this.permissionModules];
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.filteredModules = this.permissionModules.filter((module) =>
      module.name.toLowerCase().includes(query)
    );
  }

  togglePermission(
    module: PermissionModule,
    permission: 'view' | 'edit' | 'delete' | 'add'
  ): void {
    module.permissions[permission] = !module.permissions[permission];

    // In a real app, this would be an API call to update the permission
    console.log(
      `Updated ${module.name} ${permission} permission to ${module.permissions[permission]}`
    );
  }

  savePermissions(): void {
    this.loading = true;

    // In a real app, this would be an API call to save all permissions
    setTimeout(() => {
      this.loading = false;
      this.snackBar.open('Permissions saved successfully', 'Close', {
        duration: 3000,
      });
    }, 800);
  }

  goBack(): void {
    this.router.navigate(['/permissions-list']);
  }
}
