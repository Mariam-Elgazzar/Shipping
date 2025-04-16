import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ModuleService } from '../../../../services/module.service';
import { AuthService } from '../../../../services/auth.service';
import { PaginatedModuleResponse } from '../../../../models/module.model';

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
  standalone: true,
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
  permissionModules: PermissionModule[] = [];
  filteredModules: PermissionModule[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private moduleService: ModuleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.loading = true;

    // Get current user's permissions from AuthService
    const currentUser = this.authService.getCurrentUser();
    const userPermissions = currentUser?.permissions || {};

    // Fetch modules from API
    this.moduleService
      .getAllModules(
        1,
        this.pageSize,
        this.searchQuery,
        this.selectedRoleId || undefined
      )
      .subscribe({
        next: (response: PaginatedModuleResponse) => {
          // Map API modules to PermissionModule, applying user permissions
          this.permissionModules = response.data.map((module) => {
            const moduleName = module.name;
            const modulePermissions = userPermissions[moduleName] || [];
            return {
              id: module.id,
              name: moduleName,
              permissions: {
                view: modulePermissions.includes('View'),
                edit: modulePermissions.includes('Edit'),
                delete: modulePermissions.includes('Delete'),
                add: modulePermissions.includes('Create'),
              },
            };
          });
          this.filteredModules = [...this.permissionModules];
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.snackBar.open(
            `Failed to load modules: ${err.message}`,
            'Close',
            {
              duration: 5000,
            }
          );
        },
      });
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
    console.log(
      `Updated ${module.name} ${permission} permission to ${module.permissions[permission]}`
    );
  }

  savePermissions(): void {
    this.loading = true;

    // Transform PermissionModule back to backend format
    const permissionsPayload = this.permissionModules.reduce((acc, module) => {
      const modulePermissions: string[] = [];
      if (module.permissions.view) modulePermissions.push('View');
      if (module.permissions.edit) modulePermissions.push('Edit');
      if (module.permissions.delete) modulePermissions.push('Delete');
      if (module.permissions.add) modulePermissions.push('Create');
      acc[module.name] = modulePermissions;
      return acc;
    }, {} as { [key: string]: string[] });

    // Call API to save permissions
    this.moduleService.savePermissions(permissionsPayload).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Permissions saved successfully', 'Close', {
          duration: 3000,
        });
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(
          `Failed to save permissions: ${err.message}`,
          'Close',
          {
            duration: 5000,
          }
        );
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/permissions-list']);
  }
}
