// import { Component, OnInit } from '@angular/core';
// import { ShipmentService } from '../../services/shipment.service';
// import { OrderService } from '../../services/order.service';
// import { Shipment } from '../../models/shipment.model';
// import { Order } from '../../models/order.model';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { MatTableModule } from '@angular/material/table';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatButtonModule,
//     MatIconModule,
//     MatCardModule,
//     MatTableModule,
//     MatMenuModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatPaginatorModule,
//   ],
// })
// export class DashboardComponent implements OnInit {
//   recentShipments: Shipment[] = [];
//   pendingOrders: Order[] = [];

//   // Dashboard statistics
//   stats = {
//     totalShipments: 0,
//     inTransit: 0,
//     delivered: 0,
//     delayed: 0,
//     revenue: 0,
//   };

//   // Chart data
//   shipmentChartData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'Shipments',
//         data: [65, 59, 80, 81, 56, 55],
//         backgroundColor: 'rgba(0, 176, 80, 0.5)',
//       },
//     ],
//   };

//   constructor(
//     private shipmentService: ShipmentService,
//     private orderService: OrderService
//   ) {}

//   ngOnInit(): void {
//     this.loadDashboardData();
//   }

//   loadDashboardData(): void {
//     // In a real app, these would be API calls
//     this.shipmentService.getRecentShipments().subscribe((shipments) => {
//       this.recentShipments = shipments;
//       this.calculateStats(shipments);
//     });



//     this.orderService.getPendingOrders().subscribe((orders) => {
//       this.pendingOrders = orders;
//     });
//   }

    // this.orderService.getPendingOrders().subscribe((orders) => {
    //   this.pendingOrders = orders;
    // });



//   calculateStats(shipments: Shipment[]): void {
//     this.stats.totalShipments = shipments.length;
//     this.stats.inTransit = shipments.filter(
//       (s) => s.status === 'In Transit'
//     ).length;
//     this.stats.delivered = shipments.filter(
//       (s) => s.status === 'Delivered'
//     ).length;
//     this.stats.delayed = shipments.filter((s) => s.status === 'Delayed').length;
//     this.stats.revenue = shipments.reduce((sum, s) => sum + s.cost, 0);
//   }

//   getStatusClass(status: string): string {
//     switch (status) {
//       case 'Delivered':
//         return 'delivered';
//       case 'In Transit':
//         return 'in-transit';
//       case 'Delayed':
//         return 'delayed';
//       default:
//         return '';
//     }
//   }
// }
