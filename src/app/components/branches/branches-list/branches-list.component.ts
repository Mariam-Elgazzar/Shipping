import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { BranchesService, Branch } from '../../../services/branches.service';

@Component({
  selector: 'app-branches-list',
  templateUrl: './branches-list.component.html',
  styleUrls: ['./branches-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
})
export class BranchesListComponent implements OnInit {
  branches: Branch[] = [];
  filteredBranchs: Branch[] = [];
  searchQuery: string = '';
  loading: boolean = false;

  constructor(private branchesService: BranchesService, private router: Router) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.loading = true;
    this.branchesService.getBranches().subscribe({
      next: (branches) => {
        this.branches = branches;
        this.filteredBranchs = [...branches];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading branches', err);
        this.loading = false;
      },
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredBranchs = this.branches.filter((branch) =>
      branch.name.toLowerCase().includes(query)
    );
  }

  addBranch(): void {
    this.router.navigate(['/branches/add']);
  }

  editBranch(branch: Branch): void {
    this.router.navigate(['/branches', branch.id, 'edit']);
  }

  deleteBranch(branch: Branch): void {
    if (confirm(`Are you sure you want to delete ${branch.name}?`)) {
      this.branchesService.deleteBranch(branch.id).subscribe({
        next: () => {
          this.branches = this.branches.filter((b) => b.id !== branch.id);
          this.filteredBranchs = [...this.branches];
        },
        error: (err) => console.error('Error deleting branch', err),
      });
    }
  }
}