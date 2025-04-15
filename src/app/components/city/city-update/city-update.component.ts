import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CityService } from '../../../services/City.service';

@Component({
  selector: 'app-city-update',
  templateUrl: './city-update.component.html',
  styleUrls: ['./city-update.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class CityUpdateComponent implements OnInit {
  cityForm!: FormGroup;
  isLoading = false;
  cityId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.cityId = this.route.snapshot.paramMap.get('id');
    if (this.cityId) {
      this.loadCityData();
    }
  }

  private initForm(): void {
    this.cityForm = this.fb.group({
      governementName: ['', [Validators.required, Validators.minLength(3)]],
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      cost: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      pickupCost: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      status: ['', Validators.required],
    });
  }

  loadCityData(): void {
    if (!this.cityId) return;
    this.isLoading = true;
    this.cityService.getCityDetails(this.cityId).subscribe({
      next: (city) => {
        this.cityForm.patchValue({
          governementName: city.governementName,
          cityName: city.cityName,
          cost: city.cost,
          pickupCost: city.pickupCost,
          status: city.status,
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading city', err);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.cityForm.invalid) {
      Object.values(this.cityForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    if (this.cityId) {
      const cityData = this.cityForm.value;
      this.updateCity(cityData);
    }
  }

  updateCity(city: any): void {
    if (!this.cityId) return;
    this.isLoading = true;
    this.cityService.updateCity(this.cityId, city).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/cities']);
      },
      error: (err) => {
        console.error('Error updating city', err);
        this.isLoading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/cities']);
  }
}