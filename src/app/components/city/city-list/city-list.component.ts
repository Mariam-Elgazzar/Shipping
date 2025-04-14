import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import {  CityService } from '../../../services/City.service';
// import { CityDetailsComponent } from '../City-details/City-details.component';
// import { CityService } from '../../../services/City.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CityDetailsComponent } from '../city-details/city-details.component';
import { City, CityService } from '../../../services/City.service';
// import { CityDetailsComponent } from '../City-details/City-details.component';

@Component({
  selector: 'app-City-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    CityDetailsComponent,
  ],
  templateUrl: './City-list.component.html',
  styleUrls: ['./City-list.component.scss'],
})
export class CityListComponent implements OnInit {
  Citys: City[] = [];
  filteredCitys: City[] = [];
  selectedCitys: string[] = [];
  activeActionMenu: string | null = null;
  searchTerm = '';

  // For  City details modal
  selectedCityId: string | null = null;
  isCityDetailsVisible = false;

  constructor(private CityService: CityService) {}

  ngOnInit(): void {
    this.loadCitys();

    // Close action menu when clicking outside
    document.addEventListener('click', (event) => {
      if (
        this.activeActionMenu &&
        !(event.target as HTMLElement).closest('.action-btn')
      ) {
        this.activeActionMenu = null;
      }
    });
  }

  loadCitys(): void {
    this.CityService.getCitys().subscribe(
      (data) => {
        this.Citys = data;
        this.filteredCitys = [...data];
      },
      (error) => {
        console.error('Error loading  Citys:', error);
      }
    );
  }

  filterCitys(): void {
    if (!this.searchTerm.trim()) {
      this.filteredCitys = [...this.Citys];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredCitys = this.Citys.filter(
      (City) =>
        City.goverenmentName.toLowerCase().includes(term) ||
        City.cityName.toLowerCase().includes(term) ||
        City.cost.toLowerCase().includes(term)
    );
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedCitys = this.filteredCitys.map((City) => City.id);
    } else {
      this.selectedCitys = [];
    }
  }

  toggleCitySelection(CityId: string): void {
    const index = this.selectedCitys.indexOf(CityId);

    if (index === -1) {
      this.selectedCitys.push(CityId);
    } else {
      this.selectedCitys.splice(index, 1);
    }
  }

  showActionMenu(CityId: string): void {
    this.activeActionMenu = this.activeActionMenu === CityId ? null : CityId;
  }

  viewCityDetails(CityId: string): void {
    this.selectedCityId = CityId;
    this.isCityDetailsVisible = true;
    this.activeActionMenu = null;
  }

  editCity(CityId: string): void {
    console.log('Edit  City:', CityId);
    this.activeActionMenu = null;
  }

  deleteCity(CityId: string): void {
    if (confirm('Are you sure you want to delete this  City?')) {
      this.CityService.deleteCity(CityId).subscribe(
        () => {
          this.Citys = this.Citys.filter((City) => City.id !== CityId);
          this.filteredCitys = this.filteredCitys.filter(
            (City) => City.id !== CityId
          );
        },
        (error) => {
          console.error('Error deleting  City:', error);
        }
      );
    }
    this.activeActionMenu = null;
  }

  closeCityDetails(): void {
    this.isCityDetailsVisible = false;
    this.selectedCityId = null;
  }
}
