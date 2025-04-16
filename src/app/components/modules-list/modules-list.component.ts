import { Component, OnInit } from '@angular/core';
import {
  ModuleResponse,
  PaginatedModuleResponse,
} from '../../models/module.model';
import { ModuleService } from '../../services/module.service';
import { CommonModule } from '@angular/common';
// import { ModuleService } from '../services/module.service';
// import { PaginatedModuleResponse, ModuleResponse } from '../models/module.model';

@Component({
  imports: [CommonModule],
  selector: 'app-module-list',
  template: `
    <div *ngIf="modules">
      <h2>Modules</h2>
      <ul>
        <li *ngFor="let module of modules.data">
          {{ module.name }} (ID: {{ module.id }})
        </li>
      </ul>
      <p>Total Count: {{ modules?.totalCount }}</p>
    </div>
    <div *ngIf="selectedModule">
      <h2>Selected Module</h2>
      <p>Name: {{ selectedModule?.name }}</p>
    </div>
  `,
})
export class ModuleListComponent implements OnInit {
  modules: PaginatedModuleResponse | null = null;
  selectedModule: ModuleResponse | null = null;

  constructor(private moduleService: ModuleService) {}

  ngOnInit(): void {
    // Fetch all modules
    this.moduleService.getAllModules(1, 10, 'test', '123', 'name').subscribe({
      next: (response) => {
        this.modules = response;
      },
      error: (err) => console.error(err.message),
    });

    // Fetch a module by ID
    this.moduleService.getModuleById(6).subscribe({
      next: (response) => {
        this.selectedModule = response;
      },
      error: (err) => console.error(err.message),
    });
  }
}
