import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CityService } from '../../../services/City.service';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class CityAddComponent implements OnInit {
  cityForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
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

  onSubmit(): void {
    if (this.cityForm.invalid) {
      Object.values(this.cityForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    const cityData = this.cityForm.value;
    this.createCity(cityData);
  }

  createCity(city: any): void {
    this.isLoading = true;
    this.cityService.createCity(city).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/cities']);
      },
      error: (err) => {
        console.error('Error creating city', err);
        this.isLoading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/cities']);
  }
}