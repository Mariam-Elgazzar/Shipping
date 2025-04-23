import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeliveryService } from '../../../services/delivery.service';
import {
  DeliveryRequest,
  DeliveryResponse,
} from '../../../models/delivery.model';
import { GovernmentService } from '../../../services/government.service';
import { Government } from '../../../models/government.interface';

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
  governments = signal<Government[]>([]);
  governorates = signal<string[]>([]);
  saleTypes = signal<string[]>(['Fixed', 'Percentage']);
  isLoading = signal(false);
  errorMessage = signal('');
  isEditing = signal(false);
  deliveryRepId = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private governmentService: GovernmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.deliveryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
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
      government: [[], Validators.required], // Array for multiple selections
      address: ['', Validators.required],
      saleType: ['', Validators.required],
      salePresentage: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });

    this.deliveryRepId.set(this.route.snapshot.paramMap.get('id'));
    this.isEditing.set(!!this.deliveryRepId());
  }

  ngOnInit(): void {
    this.loadGovernments();
    if (this.isEditing() && this.deliveryRepId()) {
      this.loadDeliveryRep(this.deliveryRepId()!);
    }
  }

  loadGovernments(): void {
    this.governmentService.getGovernments().subscribe({
      next: (response) => {
        const governments = response.data;
        this.governments.set(governments);
        this.governorates.set(governments.map((gov) => gov.name));
      },
      error: (err) => this.errorMessage.set('Failed to load governorates'),
    });
  }

  loadDeliveryRep(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.deliveryService.getDeliveryRepById(id).subscribe({
      next: (rep: DeliveryResponse) => {
        const selectedGovernments = this.governments()
          .filter((gov) =>
            rep.governorates
              .map((g) => g.toLowerCase())
              .includes(gov.name.toLowerCase())
          )
          .map((gov) => gov.name);

        this.deliveryForm.patchValue({
          name: rep.name,
          email: rep.email,
          phone: rep.phoneNumber,
          government: selectedGovernments,
          saleType: this.saleTypes()[rep.discountType] || '',
          salePresentage: rep.companyPercentage,
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

  getSaleTypeLabel(type: string): string {
    return type; // Can be customized if needed
  }

  onSubmit(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const formValue = this.deliveryForm.value;
    const selectedGovernments = Array.isArray(formValue.government)
      ? formValue.government
      : [formValue.government];
    const governorateIds = this.governments()
      .filter((gov) => selectedGovernments.includes(gov.name))
      .map((gov) => gov.id);

    const request: DeliveryRequest = {
      id: this.isEditing() ? this.deliveryRepId() || undefined : undefined,
      name: formValue.name,
      email: formValue.email,
      phoneNumber: formValue.phone,
      password: this.isEditing() ? null : formValue.password,
      discountType: this.saleTypes().indexOf(formValue.saleType) + 1,
      companyPercentage: Number(formValue.salePresentage),
      governorateIds: governorateIds,
    };

    const operation = this.isEditing()
      ? this.deliveryService.updateDeliveryRep(request)
      : this.deliveryService.createDeliveryRep(request);
    console.log(request);
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
