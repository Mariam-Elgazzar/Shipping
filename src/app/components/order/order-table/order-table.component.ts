import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  OrderService,
  Order,
  PaginatedOrderResponse,
} from '../../../services/order.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { AddOrderModalComponent } from '../add-order-modal/add-order-modal.component';
import { EditOrderModalComponent } from '../edit-order-modal/edit-order-modal.component';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RouterLink } from '@angular/router';

interface FilterOptions {
  categories: string[];
  cities: string[];
  merchants: string[];
  orderStates: string[];
  dateRange: {
    start: string | null;
    end: string | null;
  };
}

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OrderDetailsComponent,
    AddOrderModalComponent,
    EditOrderModalComponent,
  ],
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm = '';
  pageIndex = 1;
  pageSize = 100;
  totalCount = 0;
  totalPages = 0;

  activeActionMenu: string | null = null;
  selectedOrderId: string | null = null;
  isOrderDetailsVisible = false;
  showFilterMenu = false;
  showAddOrderModal = false;
  showEditOrderModal = false;
  showAssignMerchantModal = false;
  showStatusModal = false;

  selectedOrderData: Order | null = null;
  selectedMerchant: string | null = null;
  selectedOrderToAssign: string | null = null;
  selectedStatus = '';
  statusNotes = '';

  availableCategories: string[] = [];
  availableCities: string[] = [];
  availableMerchants: string[] = [];
  availableOrderStates: string[] = [
    'Pending',
    'Delivered',
    'Cancelled',
    'Postponed',
    'Rejected',
  ];
  availableStatuses: string[] = [
    'Pending',
    'Delivered',
    'Partially Delivered',
    'Cancelled',
    'Postponed',
    'Rejected',
  ];

  filterOptions: FilterOptions = {
    categories: [],
    cities: [],
    merchants: [],
    orderStates: [],
    dateRange: { start: null, end: null },
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    document.addEventListener('keydown', this.handleEscapeKey.bind(this));
  }

  loadOrders(): void {
    const params: any = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      search: this.searchTerm || undefined,
      orderState: this.filterOptions.orderStates.length
        ? this.filterOptions.orderStates.join(',')
        : undefined,
      cityId: this.filterOptions.cities.length
        ? this.filterOptions.cities[0]
        : undefined,
      merchantId: this.filterOptions.merchants.length
        ? this.filterOptions.merchants[0]
        : undefined,
      orderType: this.filterOptions.categories.length
        ? this.filterOptions.categories[0]
        : undefined,
      fromDate: this.filterOptions.dateRange.start || undefined,
      toDate: this.filterOptions.dateRange.end || undefined,
    };

    this.orderService
      .getAllOrders(
        params.pageIndex,
        params.pageSize,
        params.search,
        params.orderState,
        params.cityId,
        undefined, // branchId
        params.merchantId,
        undefined, // shippingRepresentativeId
        params.fromDate,
        params.toDate,
        params.orderType,
        undefined, // paymentType
        undefined, // isDeleted
        undefined // sort
      )
      .subscribe({
        next: (response: PaginatedOrderResponse) => {
          this.orders = response.data;
          this.filteredOrders = [...this.orders];
          this.pageIndex = response.pageIndex;
          this.pageSize = response.pageSize;
          this.totalCount = response.totalCount;
          this.totalPages = Math.ceil(this.totalCount / this.pageSize);

          this.availableCategories = [
            ...new Set(this.orders.map((order) => order.orderType)),
          ].filter(Boolean) as string[];
          this.availableCities = [
            ...new Set(this.orders.map((order) => order.cityName)),
          ].filter(Boolean) as string[];
          this.availableMerchants = [
            ...new Set(this.orders.map((order) => order.merchantName)),
          ].filter(Boolean) as string[];
        },
        error: (err) => {
          console.error('Error fetching orders:', err);
          alert('Failed to load orders. Please try again.');
        },
      });
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.pageIndex = newPage;
      this.loadOrders();
    }
  }

  filterOrders(): void {
    this.pageIndex = 1; // Reset to first page on filter change
    this.loadOrders();
  }

  // isFilterSelected(filterType: keyof FilterOptions, value: string): boolean {
  //   return this.filterOptions[filterType].includes(value);
  // }

  // toggleFilter(filterType: keyof FilterOptions, value: string): void {
  //   const filterArray = this.filterOptions[filterType];
  //   const index = filterArray.indexOf(value);
  //   if (index === -1) {
  //     filterArray.push(value);
  //   } else {
  //     filterArray.splice(index, 1);
  //   }
  // }

  onOrderCreated(): void {
    this.showAddOrderModal = false;
    this.loadOrders();
  }
  resetFilters(): void {
    this.filterOptions = {
      categories: [],
      cities: [],
      merchants: [],
      orderStates: [],
      dateRange: { start: null, end: null },
    };
    this.searchTerm = '';
    this.pageIndex = 1;
    this.loadOrders();
  }

  applyFilters(): void {
    this.filterOrders();
    this.showFilterMenu = false;
  }

  addNewOrder(): void {
    const userData = localStorage.getItem('user_data');
    const userPermissionsRaw = localStorage.getItem('user_permissions');
    let userPermissions: { [key: string]: string[] } = {};

    // if (userPermissionsRaw) {
    //   try {
    //     userPermissions = JSON.parse(userPermissionsRaw);
    //   } catch (error) {
    //     console.error('Failed to parse user permissions:', error);
    //     alert('Invalid user permissions data.');
    //     return;
    //   }
    // }

    if (userData === 'Merchant' || userData !== 'Employee') {
      this.showAddOrderModal = true;
    } else {
      this.showAddOrderModal = false;
      alert('You do not have permission to add a new order.');
    }
  }

  createOrder(orderData: any): void {
    // TODO: Requires POST /Orders endpoint
    console.log('Create order:', orderData);
    this.showAddOrderModal = false;
    this.loadOrders();
  }

  editOrder(orderId: string): void {
    this.orderService.getOrderById(Number(orderId)).subscribe({
      next: (order) => {
        this.selectedOrderId = orderId;
        this.selectedOrderData = order;
        this.showEditOrderModal = true;
        this.activeActionMenu = null;
      },
      error: (err) => {
        console.error('Error fetching order for edit:', err);
        alert('Failed to load order details.');
      },
    });
  }

  updateOrder(orderData: any): void {
    // TODO: Requires PUT /Orders/{id} endpoint
    console.log('Update order:', orderData);
    this.closeEditModal();
    this.loadOrders();
  }

  closeEditModal(): void {
    this.showEditOrderModal = false;
    this.selectedOrderId = null;
    this.selectedOrderData = null;
  }

  deleteOrder(orderId: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      // TODO: Requires DELETE /Orders/{id} endpoint
      console.log('Delete order:', orderId);
      this.loadOrders();
    }
    this.activeActionMenu = null;
  }

  showAssignModal(orderId: string): void {
    this.selectedOrderToAssign = orderId;
    this.selectedMerchant = '';
    this.showAssignMerchantModal = true;
  }

  closeAssignModal(): void {
    this.showAssignMerchantModal = false;
    this.selectedOrderToAssign = null;
  }

  assignMerchant(): void {
    if (this.selectedOrderToAssign && this.selectedMerchant) {
      // TODO: Requires endpoint to assign merchant (e.g., PATCH /Orders/{id}/AssignMerchant)
      console.log(
        `Assign order ${this.selectedOrderToAssign} to merchant ${this.selectedMerchant}`
      );
      this.loadOrders();
    }
    this.closeAssignModal();
  }

  showStatusChangeModal(orderId: string): void {
    this.selectedOrderId = orderId;
    this.showStatusModal = true;
    this.orderService.getOrderById(Number(orderId)).subscribe({
      next: (order) => {
        this.selectedStatus = order.orderState || 'Pending';
        this.statusNotes = order.notes || '';
      },
      error: (err) => {
        console.error('Error fetching order for status change:', err);
        this.selectedStatus = 'Pending';
        this.statusNotes = '';
      },
    });
  }

  closeStatusModal(): void {
    this.showStatusModal = false;
    this.selectedOrderId = null;
  }

  saveStatusChange(): void {
    if (this.selectedOrderId && this.selectedStatus) {
      // TODO: Requires endpoint to update status (e.g., PATCH /Orders/{id}/Status)
      console.log(
        `Update order ${this.selectedOrderId} status to ${this.selectedStatus}`
      );
      this.loadOrders();
    }
    this.closeStatusModal();
  }

  viewOrderDetails(orderId: string): void {
    this.orderService.getOrderById(Number(orderId)).subscribe({
      next: (order) => {
        this.selectedOrderId = orderId;
        this.selectedOrderData = order;
        this.isOrderDetailsVisible = true;
        this.activeActionMenu = null;
      },
      error: (err) => {
        console.error('Error fetching order details:', err);
        alert('Failed to load order details.');
      },
    });
  }

  closeOrderDetails(): void {
    this.isOrderDetailsVisible = false;
    this.selectedOrderId = null;
    this.selectedOrderData = null;
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.filteredOrders.map((order) => ({
        'Order ID': order.id,
        Date: order.creationDate,
        'Customer Name': order.customerName,
        City: order.cityName,
        'Order Cost': order.orderPrice,
        Status: order.orderState || 'Pending',
        Merchant: order.merchantName,
        'Order Type': order.orderType,
      }))
    );
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const fileName = `Orders_${new Date().toISOString().split('T')[0]}.xlsx`;
    saveAs(blob, fileName);
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    const columns = [
      { header: 'Order ID', dataKey: 'id' },
      { header: 'Date', dataKey: 'creationDate' },
      { header: 'Customer', dataKey: 'customerName' },
      { header: 'City', dataKey: 'cityName' },
      { header: 'Cost', dataKey: 'orderPrice' },
      { header: 'Status', dataKey: 'orderState' },
    ];
    const data = this.filteredOrders.map((order) => ({
      id: order.id,
      creationDate: order.creationDate,
      customerName: order.customerName,
      cityName: order.cityName,
      orderPrice: order.orderPrice,
      orderState: order.orderState || 'Pending',
    }));
    doc.text('Orders Report', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);
    autoTable(doc, {
      columns,
      body: data,
      startY: 30,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [0, 167, 111] },
    });
    const fileName = `Orders_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      Pending: 'pending',
      Delivered: 'delivered',
      'Partially Delivered': 'partially-delivered',
      Cancelled: 'cancelled',
      Postponed: 'postponed',
      Rejected: 'rejected',
    };
    return statusMap[status] || 'pending';
  }

  showActionMenu(event: MouseEvent, orderId: string): void {
    event.stopPropagation();
    this.activeActionMenu = this.activeActionMenu === orderId ? null : orderId;
    this.showFilterMenu = false;
    this.showAssignMerchantModal = false;
    this.showStatusModal = false;
    setTimeout(() => {
      const button = event.currentTarget as HTMLElement;
      const menu = document.querySelector('.action-menu') as HTMLElement;
      if (button && menu) {
        const rect = button.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const menuHeight = menu.offsetHeight;
        menu.style.position = 'fixed';
        menu.style.top =
          rect.bottom + menuHeight > windowHeight
            ? `${rect.top - menuHeight}px`
            : `${rect.bottom + 5}px`;
        menu.style.left =
          rect.left + menu.offsetWidth > window.innerWidth
            ? `${rect.right - menu.offsetWidth}px`
            : `${rect.left}px`;
        menu.style.zIndex = '1050';
      }
    });
  }

  toggleFilterMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showFilterMenu = !this.showFilterMenu;
    if (this.showFilterMenu) {
      this.activeActionMenu = null;
      this.showAssignMerchantModal = false;
      this.showStatusModal = false;
      setTimeout(() => {
        const button = event.currentTarget as HTMLElement;
        const filterMenu = document.querySelector(
          '.filter-dropdown'
        ) as HTMLElement;
        if (button && filterMenu) {
          const rect = button.getBoundingClientRect();
          filterMenu.style.position = 'absolute';
          filterMenu.style.top = `${rect.bottom + window.scrollY + 5}px`;
          filterMenu.style.left = `${
            rect.left - filterMenu.offsetWidth + button.offsetWidth
          }px`;
        }
      });
    }
  }

  handleDocumentClick(event: MouseEvent): void {
    if (
      this.showFilterMenu ||
      this.activeActionMenu ||
      this.showAssignMerchantModal ||
      this.showStatusModal
    ) {
      const target = event.target as HTMLElement;
      if (
        target.closest('.filter-menu') ||
        target.closest('.filter-btn') ||
        target.closest('.action-menu') ||
        target.closest('.action-btn') ||
        target.closest('.modal-container') ||
        target.closest('.assign-btn')
      ) {
        return;
      }
      this.showFilterMenu = false;
      this.activeActionMenu = null;
      this.showAssignMerchantModal = false;
      this.showStatusModal = false;
    }
  }

  handleEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.activeActionMenu = null;
      this.showFilterMenu = false;
      this.showAssignMerchantModal = false;
      this.showStatusModal = false;
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleDocumentClick.bind(this));
    document.removeEventListener('keydown', this.handleEscapeKey.bind(this));
  }
}
