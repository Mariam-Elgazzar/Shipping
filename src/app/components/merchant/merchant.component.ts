import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MerchantService } from "../../services/merchant.service";
import { UserService } from "../../services/user.service";
import { LocationService } from "../../services/location.service";
import { Merchant } from "../../models/merchant.model";
import { User } from "../../models/user.model";
 
@Component({
  selector: "app-merchant",
  templateUrl: "./merchant.component.html",
  styleUrls: ["./merchant.component.scss"],
  standalone: true,  // إضافة هذا السطر لتعريف الكومبوننت كـ "standalone"
  imports: [ReactiveFormsModule] 
})
export class MerchantComponent implements OnInit {
  merchantForm!: FormGroup;
  users: User[] = [];
  governments: string[] = [];
  cities: { [government: string]: string[] } = {};
  availableCities: string[] = [];
  isLoading = false;
  isEditing = false;
  currentMerchantId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private userService: UserService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
    this.loadLocations();
  }

  private initForm(): void {
    this.merchantForm = this.fb.group({
      userId: ["", Validators.required],
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", this.isEditing ? [] : [Validators.required, Validators.minLength(6)]],
      branch: ["", Validators.required],
      phoneNumber: ["", [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      address: ["", Validators.required],
      government: ["", Validators.required],
      city: ["", Validators.required],
      cost_Rejection: [0, [Validators.required, Validators.min(0)]],
      bickup: [0, [Validators.required, Validators.min(0)]],
    });

    this.merchantForm.get("government")?.valueChanges.subscribe(government => {
      this.availableCities = this.cities[government] || [];
      this.merchantForm.get("city")?.setValue("");
    });
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading users", err);
        this.isLoading = false;
      }
    });
  }

  loadLocations(): void {
    this.locationService.getGovernments().subscribe({
      next: (govs) => {
        this.governments = govs;
      },
      error: (err) => {
        console.error("Error loading governments", err);
      }
    });

    this.locationService.getCities().subscribe({
      next: (c) => {
        this.cities = c;
      },
      error: (err) => {
        console.error("Error loading cities", err);
      }
    });
  }

  onSubmit(): void {
    if (this.merchantForm.invalid) {
      Object.values(this.merchantForm.controls).forEach(control => control.markAsTouched());
      return;
    }

    const merchantData: Merchant = this.merchantForm.value;

    if (this.isEditing && this.currentMerchantId) {
      if (!merchantData.password) {
        delete merchantData.password;
      }
      this.updateMerchant(merchantData);
    } else {
      this.createMerchant(merchantData);
    }
  }

  createMerchant(merchant: Merchant): void {
    this.isLoading = true;
    this.merchantService.createMerchant(merchant).subscribe({
      next: () => {
        this.resetForm();
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error creating merchant", err);
        this.isLoading = false;
      }
    });
  }

  updateMerchant(merchant: Merchant): void {
    if (!this.currentMerchantId) return;

    this.isLoading = true;
    this.merchantService.updateMerchant(this.currentMerchantId, merchant).subscribe({
      next: () => {
        this.resetForm();
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error updating merchant", err);
        this.isLoading = false;
      }
    });
  }

  editMerchant(merchant: Merchant): void {
    this.isEditing = true;
    this.currentMerchantId = merchant.userId;

    this.merchantForm.get("government")?.setValue(merchant.government);

    this.merchantForm.patchValue({
      userId: merchant.userId,
      name: merchant.name,
      email: merchant.email,
      branch: merchant.branch,
      phoneNumber: merchant.phoneNumber,
      address: merchant.address,
      city: merchant.city,
      cost_Rejection: merchant.cost_Rejection,
      bickup: merchant.bickup
    });

    const passwordControl = this.merchantForm.get("password");
    if (passwordControl) {
      passwordControl.setValidators(this.isEditing ? [] : [Validators.required, Validators.minLength(6)]);
      passwordControl.updateValueAndValidity();
    }
  }

  resetForm(): void {
    this.merchantForm.reset({
      userId: "",
      name: "",
      email: "",
      password: "",
      branch: "",
      phoneNumber: "",
      address: "",
      government: "",
      city: "",
      cost_Rejection: 0,
      bickup: 0,
    });
    this.isEditing = false;
    this.currentMerchantId = null;
    this.availableCities = [];
  }

  cancel(): void {
    this.resetForm();
  }
}
