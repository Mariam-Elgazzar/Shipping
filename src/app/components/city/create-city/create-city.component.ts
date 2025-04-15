import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: "app-create-city",
  templateUrl: "./create-city.component.html",
  styleUrls: ["./create-city.component.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
})
export class CreateCityComponent implements OnInit {
  cityForm!: FormGroup
  loading = false
  governments: { id: string; name: string }[] = [
    { id: "1", name: "Cairo" },
    { id: "2", name: "Alexandria" },
    { id: "3", name: "Giza" },
    { id: "4", name: "Sharm El Sheikh" },
    { id: "5", name: "Luxor" },
    { id: "6", name: "Aswan" },
    { id: "7", name: "Port Said" },
    { id: "8", name: "Suez" },
    { id: "9", name: "Ismailia" },
    { id: "10", name: "Hurghada" },
  ]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.cityForm = this.fb.group({
      government: ["", Validators.required],
      cityName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],

      normalOrderCost: ["", [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      pickupOrderCost: ["", [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    })
  }

  onSubmit(): void {
    if (this.cityForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.cityForm.controls).forEach((key) => {
        const control = this.cityForm.get(key)
        control?.markAsTouched()
      })
      return
    }

    this.loading = true

    // Get form values
    const cityData = {
      governmentId: this.cityForm.value.government,
      governmentName: this.governments.find((g) => g.id === this.cityForm.value.government)?.name,
      cityName: this.cityForm.value.cityName,
      normalOrderCost: Number.parseFloat(this.cityForm.value.normalOrderCost),
      pickupOrderCost: Number.parseFloat(this.cityForm.value.pickupOrderCost),
    }

    // In a real app, this would be a service call
    console.log("Saving city:", cityData)

    // Simulate API call
    setTimeout(() => {
      this.loading = false
      this.snackBar.open("City created successfully!", "Close", {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      })
      this.goBack()
    }, 1000)
  }

  goBack(): void {
    this.router.navigate(["/cities"])
  }

  // Helper methods for form validation
  get governmentControl() {
    return this.cityForm.get("government")
  }
  get cityNameControl() {
    return this.cityForm.get("cityName")
  }
  get normalOrderCostControl() {
    return this.cityForm.get("normalOrderCost")
  }
  get pickupOrderCostControl() {
    return this.cityForm.get("pickupOrderCost")
  }
}

