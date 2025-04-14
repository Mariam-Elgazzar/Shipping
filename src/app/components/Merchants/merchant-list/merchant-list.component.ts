import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import {  merchantService } from '../../../services/Merchant.service';
// import { MerchantDetailsComponent } from '../merchant-details/merchant-details.component';
import { MerchantService } from '../../../services/merchant.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MerchantDetailsComponent } from '../merchant-details/merchant-details.component';

interface merchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchLocation: string;
  branchName: string;
  status: string;
}
@Component({
  selector: 'app-Merchant-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    MerchantDetailsComponent,
  ],
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss'],
})
export class MerchantListComponent implements OnInit {
  merchants: merchant[] = [];
  filteredMerchants: merchant[] = [];
  selectedMerchants: string[] = [];
  activeActionMenu: string | null = null;
  searchTerm = '';

  // For  merchant details modal
  selectedMerchantId: string | null = null;
  isMerchantDetailsVisible = false;

  constructor(private merchantService: MerchantService) {}

  ngOnInit(): void {
    this.loadMerchants();

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

  loadMerchants(): void {
    this.merchantService.getMerchants().subscribe(
      (data) => {
        this.merchants = data;
        this.filteredMerchants = [...data];
      },
      (error) => {
        console.error('Error loading  merchants:', error);
      }
    );
  }

  filterMerchants(): void {
    if (!this.searchTerm.trim()) {
      this.filteredMerchants = [...this.merchants];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredMerchants = this.merchants.filter(
      (merchant) =>
        merchant.phone.toLowerCase().includes(term) ||
        merchant.name.toLowerCase().includes(term) ||
        merchant.branchLocation.toLowerCase().includes(term)
    );
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedMerchants = this.filteredMerchants.map(
        (merchant) => merchant.id
      );
    } else {
      this.selectedMerchants = [];
    }
  }

  toggleMerchantSelection(MerchantId: string): void {
    const index = this.selectedMerchants.indexOf(MerchantId);

    if (index === -1) {
      this.selectedMerchants.push(MerchantId);
    } else {
      this.selectedMerchants.splice(index, 1);
    }
  }

  showActionMenu(merchantId: string): void {
    this.activeActionMenu =
      this.activeActionMenu === merchantId ? null : merchantId;
  }

  viewMerchantDetails(merchantId: string): void {
    this.selectedMerchantId = merchantId;
    this.isMerchantDetailsVisible = true;
    this.activeActionMenu = null;
  }

  editMerchant(merchantId: string): void {
    console.log('Edit  merchant:', merchantId);
    this.activeActionMenu = null;
  }

  deleteMerchant(merchantId: string): void {
    if (confirm('Are you sure you want to delete this  merchant?')) {
      this.merchantService.deleteMerchant(merchantId).subscribe(
        () => {
          this.merchants = this.merchants.filter(
            (merchant) => merchant.id !== merchantId
          );
          this.filteredMerchants = this.filteredMerchants.filter(
            (merchant) => merchant.id !== merchantId
          );
        },
        (error) => {
          console.error('Error deleting  merchant:', error);
        }
      );
    }
    this.activeActionMenu = null;
  }

  closeMerchantDetails(): void {
    this.isMerchantDetailsVisible = false;
    this.selectedMerchantId = null;
  }
}
