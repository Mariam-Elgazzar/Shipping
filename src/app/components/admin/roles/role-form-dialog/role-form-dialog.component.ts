import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../../../../services/role.service';
import { Role, Permission } from '../../../../models/user.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-role-form-dialog',
  templateUrl: './role-form-dialog.component.html',
  styleUrls: ['./role-form-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
})
export class RoleFormDialogComponent implements OnInit {
  roleForm!: FormGroup;
  isEditMode = false;
  permissionsByModule: Record<string, Permission[]> = {};
  selectedPermissions: Set<string> = new Set();
  loading = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RoleFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { role?: Role }
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data.role;

    this.roleForm = this.fb.group({
      name: [
        this.data.role?.name || '',
        [Validators.required, Validators.minLength(3)],
      ],
      description: [this.data.role?.description || ''],
    });

    this.loadPermissions();

    if (this.isEditMode && this.data.role?.permissions) {
      this.data.role.permissions.forEach((permission) => {
        this.selectedPermissions.add(permission.id);
      });
    }
  }

  loadPermissions(): void {
    this.loading = true;
    this.roleService.getPermissionsByModule().subscribe({
      next: (permissionsByModule) => {
        this.permissionsByModule = permissionsByModule;
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open('Failed to load permissions', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
        this.loading = false;
      },
    });
  }

  togglePermission(permissionId: string): void {
    if (this.selectedPermissions.has(permissionId)) {
      this.selectedPermissions.delete(permissionId);
    } else {
      this.selectedPermissions.add(permissionId);
    }
  }

  selectAllInModule(module: string): void {
    const modulePermissions = this.permissionsByModule[module];
    let allSelected = true;

    // Check if all permissions in this module are already selected
    for (const permission of modulePermissions) {
      if (!this.selectedPermissions.has(permission.id)) {
        allSelected = false;
        break;
      }
    }

    // Toggle selection based on current state
    if (allSelected) {
      // Deselect all in this module
      for (const permission of modulePermissions) {
        this.selectedPermissions.delete(permission.id);
      }
    } else {
      // Select all in this module
      for (const permission of modulePermissions) {
        this.selectedPermissions.add(permission.id);
      }
    }
  }

  isModuleFullySelected(module: string): boolean {
    const modulePermissions = this.permissionsByModule[module];
    return modulePermissions.every((permission) =>
      this.selectedPermissions.has(permission.id)
    );
  }

  isModulePartiallySelected(module: string): boolean {
    const modulePermissions = this.permissionsByModule[module];
    const selectedCount = modulePermissions.filter((permission) =>
      this.selectedPermissions.has(permission.id)
    ).length;
    return selectedCount > 0 && selectedCount < modulePermissions.length;
  }

  onSubmit(): void {
    if (this.roleForm.invalid) {
      return;
    }

    this.loading = true;

    // Get all permissions from selected IDs
    const allPermissions = Object.values(this.permissionsByModule).flat();
    const selectedPermissions = allPermissions.filter((permission) =>
      this.selectedPermissions.has(permission.id)
    );

    const roleData = {
      ...this.roleForm.value,
      permissions: selectedPermissions,
    };

    if (this.isEditMode) {
      this.roleService.updateRole(this.data.role!.id, roleData).subscribe({
        next: (role) => {
          this.snackBar.open('Role updated successfully', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.snackBar.open('Failed to update role', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
          this.loading = false;
        },
      });
    } else {
      this.roleService.createRole(roleData).subscribe({
        next: (role) => {
          this.snackBar.open('Role created successfully', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.snackBar.open('Failed to create role', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
          this.loading = false;
        },
      });
    }
  }
}
