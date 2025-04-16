import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import {  DeliveryService } from '../../../services/Delivery.service';
// import { DeliveryDetailsComponent } from '../Delivery-details/Delivery-details.component';
// import { DeliveryService } from '../../../services/Delivery.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DeliveryDetailsComponent } from '../delivery-details/delivery-details.component';
import { DeliveryService } from '../../../services/delivery.service';
// import { DeliveryDetailsComponent } from '../Delivery-details/Delivery-details.component';

interface Delivery {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchLocation: string;
  branchName: string;
  status: string;
}
@Component({
  selector: 'app-delivery-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    // RouterLinkActive,
    DeliveryDetailsComponent,
  ],
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent implements OnInit {
  Deliverys: Delivery[] = [];
  filteredDeliverys: Delivery[] = [];
  selectedDeliverys: string[] = [];
  activeActionMenu: string | null = null;
  searchTerm = '';

  // For  Delivery details modal
  selectedDeliveryId: string | null = null;
  isDeliveryDetailsVisible = false;

  constructor(private DeliveryService: DeliveryService, private router: Router) {}

  ngOnInit(): void {
    this.loadDeliverys();

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

  loadDeliverys(): void {
    this.DeliveryService.getDeliverys().subscribe(
      (data) => {
        this.Deliverys = data;
        this.filteredDeliverys = [...data];
      },
      (error) => {
        console.error('Error loading  Deliverys:', error);
      }
    );
  }

  filterDeliverys(): void {
    if (!this.searchTerm.trim()) {
      this.filteredDeliverys = [...this.Deliverys];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredDeliverys = this.Deliverys.filter(
      (Delivery) =>
        Delivery.phone.toLowerCase().includes(term) ||
        Delivery.name.toLowerCase().includes(term) ||
        Delivery.branchLocation.toLowerCase().includes(term)
    );
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedDeliverys = this.filteredDeliverys.map(
        (Delivery) => Delivery.id
      );
    } else {
      this.selectedDeliverys = [];
    }
  }

  toggleDeliverySelection(DeliveryId: string): void {
    const index = this.selectedDeliverys.indexOf(DeliveryId);

    if (index === -1) {
      this.selectedDeliverys.push(DeliveryId);
    } else {
      this.selectedDeliverys.splice(index, 1);
    }
  }

  showActionMenu(DeliveryId: string): void {
    this.activeActionMenu =
      this.activeActionMenu === DeliveryId ? null : DeliveryId;
  }

  viewDeliveryDetails(DeliveryId: string): void {
    this.selectedDeliveryId = DeliveryId;
    this.isDeliveryDetailsVisible = true;
    this.activeActionMenu = null;
  }

  editDelivery(DeliveryId: string): void {
    // console.log('Edit  Delivery:', DeliveryId);
    this.router.navigate([`/delivery/update/${DeliveryId}`]);
    //delivery/update/:id
    this.activeActionMenu = null;
  }

  deleteDelivery(DeliveryId: string): void {
    if (confirm('Are you sure you want to delete this  Delivery?')) {
      this.DeliveryService.deleteDelivery(DeliveryId).subscribe(
        () => {
          this.Deliverys = this.Deliverys.filter(
            (Delivery) => Delivery.id !== DeliveryId
          );
          this.filteredDeliverys = this.filteredDeliverys.filter(
            (Delivery) => Delivery.id !== DeliveryId
          );
        },
        (error) => {
          console.error('Error deleting  Delivery:', error);
        }
      );
    }
    this.activeActionMenu = null;
  }

  closeDeliveryDetails(): void {
    this.isDeliveryDetailsVisible = false;
    this.selectedDeliveryId = null;
  }
}
