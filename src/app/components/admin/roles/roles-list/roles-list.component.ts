import { Component, signal, computed } from '@angular/core';
import { RoleService } from '../../../../services/role.service';
import { Role } from '../../../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { RoleFormDialogComponent } from '../role-form-dialog/role-form-dialog.component';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { catchError, map, of, startWith } from 'rxjs';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [
    DataTableComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    DatePipe,
  ],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss',
})
export class RolesListComponent {
  // Signals for reactive state
  roles = signal<Role[]>([]);
  searchTerm = signal<string>('');
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  showConfirmDialog = signal<boolean>(false);
  roleToDelete = signal<Role | null>(null);
  selectedRole = signal<Role | null>(null);
  menuPosition = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  // Computed signal for filtered roles
  filteredRoles = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.roles();

    return this.roles().filter(
      (role) =>
        role.name.toLowerCase().includes(term) ||
        (role.description && role.description.toLowerCase().includes(term))
    );
  });

  // Table configuration
  tableColumns = [
    { key: 'name', label: 'Name', primary: true },
    { key: 'description', label: 'Description' },
    { key: 'permissionsCount', label: 'Permissions' },
    { key: 'updatedAt', label: 'Last Updated', pipe: 'date' },
  ];

  constructor(private roleService: RoleService, private dialog: MatDialog) {
    this.loadRoles();
  }

  private loadRoles(): void {
    this.loading.set(true);
    this.error.set(null);

    this.roleService
      .getRoles()
      .pipe(
        map((roles) =>
          roles.map((role) => ({
            ...role,
            permissionsCount: role.permissions.length,
          }))
        ),
        catchError((err) => {
          this.error.set('Failed to load roles. Please try again.');
          console.error('Error loading roles:', err);
          return of([]);
        }),
        startWith([])
      )
      .subscribe((roles) => {
        this.roles.set(roles);
        this.loading.set(false);
      });
  }

  openRoleForm(role?: Role): void {
    const dialogRef = this.dialog.open(RoleFormDialogComponent, {
      width: '600px',
      data: role || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRoles();
      }
    });
  }

  openRoleView(role: Role): void {
    const dialogRef = this.dialog.open(RoleFormDialogComponent, {
      width: '600px',
      data: { ...role, readOnly: true },
    });
  }

  onSearch(query: string): void {
    this.searchTerm.set(query);
  }

  onRowAction(role: Role, action: 'edit' | 'delete' | 'view'): void {
    if (action === 'edit') {
      this.openRoleForm(role);
    } else if (action === 'delete') {
      this.confirmDeleteRole(role);
    } else if (action === 'view') {
      this.openRoleView(role);
    }
    this.selectedRole.set(null); // Close menu
  }

  onRowSelected(role: any, event: MouseEvent): void {
    this.selectedRole.set(role);
    this.menuPosition.set({ x: event.clientX, y: event.clientY });
    event.stopPropagation();
  }

  confirmDeleteRole(role: Role): void {
    this.roleToDelete.set(role);
    this.showConfirmDialog.set(true);
  }

  cancelDelete(): void {
    this.showConfirmDialog.set(false);
    this.roleToDelete.set(null);
  }

  deleteRole(): void {
    const role = this.roleToDelete();
    if (!role) return;

    this.loading.set(true);
    this.error.set(null);

    this.roleService
      .deleteRole(role.id)
      .pipe(
        catchError((err) => {
          this.error.set('Failed to delete role. Please try again.');
          console.error('Error deleting role:', err);
          return of(null);
        })
      )
      .subscribe(() => {
        this.showConfirmDialog.set(false);
        this.roleToDelete.set(null);
        this.loadRoles();
      });
  }
}
