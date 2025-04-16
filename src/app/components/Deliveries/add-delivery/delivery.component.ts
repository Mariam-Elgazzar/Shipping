import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
// import { DeliveryService } from '../../services/delivery.service';
// import { City, DeliveryResponse, DeliveryRequest } from '../../models/delivery.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { City } from '../../../models/merchant.model';
import { DeliveryService } from '../../../services/delivery.service';
import {
  DeliveryRequest,
  DeliveryResponse,
} from '../../../models/delivery.model';

@Component({
  selector: 'app-delivery-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryFormComponent {
  deliveryForm: FormGroup;
  cities = signal<City[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  isEditing = signal(false);
  deliveryRepId = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.deliveryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)],
      ],
      password: [
        '',
        this.isEditing()
          ? []
          : [
              Validators.required,
              Validators.minLength(8),
              Validators.pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
              ),
            ],
      ],
      discountType: [0, Validators.required],
      companyPercentage: [
        100,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      governorateIds: [[], Validators.required],
    });

    // Initialize deliveryRepId and isEditing
    this.deliveryRepId.set(this.route.snapshot.paramMap.get('id'));
    this.isEditing.set(!!this.deliveryRepId());
  }

  ngOnInit(): void {
    this.loadCities();
    if (this.isEditing() && this.deliveryRepId()) {
      this.loadDeliveryRep(this.deliveryRepId()!);
    }
  }

  loadCities(): void {
    this.deliveryService.getCities().subscribe({
      next: (cities) => this.cities.set(cities),
      error: (err) => this.errorMessage.set('Failed to load governorates'),
    });
  }

  loadDeliveryRep(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.deliveryService.getDeliveryRepById(id).subscribe({
      next: (rep: DeliveryResponse) => {
        this.deliveryForm.patchValue({
          name: rep.name,
          email: rep.email,
          phoneNumber: rep.phoneNumber,
          discountType: rep.discountType,
          companyPercentage: rep.companyPercentage,
          governorateIds: this.mapGovernoratesToIds(rep.governorates),
        });
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(
          err.message || 'Failed to load delivery representative'
        );
        this.isLoading.set(false);
      },
    });
  }

  // Map governorate names to IDs based on cities
  mapGovernoratesToIds(governorates: string[]): number[] {
    return this.cities()
      .filter((city) =>
        governorates
          .map((g) => g.toLowerCase())
          .includes(city.name.toLowerCase())
      )
      .map((city) => city.id);
  }

  onSubmit(): void {
    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const formValue = this.deliveryForm.value;
    const request: DeliveryRequest = {
      id: this.isEditing() ? this.deliveryRepId() || undefined : undefined,
      name: formValue.name,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      password: this.isEditing() ? undefined : formValue.password,
      discountType: Number(formValue.discountType),
      companyPercentage: Number(formValue.companyPercentage),
      governorateIds: formValue.governorateIds.map(Number),
    };

    const operation = this.isEditing()
      ? this.deliveryService.updateDeliveryRep(request)
      : this.deliveryService.createDeliveryRep(request);

    operation.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/delivery-reps']);
      },
      error: (err) => {
        this.errorMessage.set(
          err.message ||
            `Failed to ${
              this.isEditing() ? 'update' : 'create'
            } delivery representative`
        );
        this.isLoading.set(false);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/delivery-reps']);
  }
}
