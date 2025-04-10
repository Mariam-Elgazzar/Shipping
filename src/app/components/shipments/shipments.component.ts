import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCell, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ShipmentService } from '../../services/shipment.service';
import { Shipment } from '../../models/shipment.model';
import { ShipmentFormComponent } from '../shipment-form/shipment-form.component';
import { MatIcon } from '@angular/material/icon';
import { MatMenu } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatChipsModule,
  ],
})
export class ShipmentsComponent implements OnInit {
  displayedColumns: string[] = [
    'trackingNumber',
    'origin',
    'destination',
    'status',
    'date',
    'actions',
  ];
  dataSource!: MatTableDataSource<Shipment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private shipmentService: ShipmentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments(): void {
    this.shipmentService.getShipments().subscribe((shipments) => {
      this.dataSource = new MatTableDataSource(shipments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openShipmentForm(shipment?: Shipment): void {
    const dialogRef = this.dialog.open(ShipmentFormComponent, {
      width: '600px',
      data: shipment || {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadShipments();
      }
    });
  }

  deleteShipment(id: string): void {
    if (confirm('Are you sure you want to delete this shipment?')) {
      this.shipmentService.deleteShipment(id).subscribe(() => {
        this.loadShipments();
      });
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Delivered':
        return 'primary';
      case 'In Transit':
        return 'accent';
      case 'Delayed':
        return 'warn';
      default:
        return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Delivered':
        return 'status-delivered';
      case 'In Transit':
        return 'status-in-transit';
      case 'Delayed':
        return 'status-delayed';
      default:
        return 'status-unknown';
    }
  }
}
