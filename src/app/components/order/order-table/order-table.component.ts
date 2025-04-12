// // // // import { Component, OnInit,  OnDestroy } from "@angular/core"
// // // // import { CommonModule } from "@angular/common"
// // // // import { FormsModule } from "@angular/forms"
// // // // import { OrderService } from "../../../services/order.service"
// // // // import { OrderDetailsComponent } from "../order-details/order-details.component"
// // // // import { AddOrderModalComponent} from "../add-order-modal/add-order-modal.component"

// // // // interface Order {
// // // //   id: string
// // // //   category: string
// // // //   origin: string
// // // //   destination: string
// // // //   arrivalDate: string
// // // //   weight: string
// // // //   lastLocation: string
// // // // }

// // // // interface FilterOptions {
// // // //   categories: string[]
// // // //   dateRange: {
// // // //     start: string | null
// // // //     end: string | null
// // // //   }
// // // //   locations: string[]
// // // // }

// // // // @Component({
// // // //   selector: "app-order-table",
// // // //   standalone: true,
// // // //   imports: [CommonModule, FormsModule, OrderDetailsComponent, AddOrderModalComponent],

// // // //   templateUrl: "./order-table.component.html",
// // // //   styleUrls: ["./order-table.component.scss"],
// // // // })
// // // // export class OrderTableComponent implements OnInit, OnDestroy {
// // // //   orders: Order[] = [
// // // //     {
// // // //       id: "MHGJ3-0",
// // // //       category: "Electronic",
// // // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // // //       arrivalDate: "5:00 pm",
// // // //       weight: "10 kg",
// // // //       lastLocation: "Warehouse A",
// // // //     },
// // // //     {
// // // //       id: "MHGJ3-2",
// // // //       category: "Fashion",
// // // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // // //       arrivalDate: "5:00 pm",
// // // //       weight: "10 kg",
// // // //       lastLocation: "Warehouse A",
// // // //     },
// // // //     {
// // // //       id: "MHGJ3-0",
// // // //       category: "Food",
// // // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // // //       arrivalDate: "5:00 pm",
// // // //       weight: "10 kg",
// // // //       lastLocation: "Warehouse A",
// // // //     },
// // // //     {
// // // //       id: "MHGJ3-2",
// // // //       category: "Furniture",
// // // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // // //       arrivalDate: "5:00 pm",
// // // //       weight: "10 kg",
// // // //       lastLocation: "Warehouse A",
// // // //     },
// // // //     {
// // // //       id: "MHGJ3-2",
// // // //       category: "Frozen Food",
// // // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // // //       arrivalDate: "5:00 pm",
// // // //       weight: "10 kg",
// // // //       lastLocation: "Warehouse B",
// // // //     },
// // // //     {
// // // //       id: "MHGJ3-2",
// // // //       category: "Auto Parts",
// // // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // // //       arrivalDate: "5:00 pm",
// // // //       weight: "10 kg",
// // // //       lastLocation: "Warehouse C",
// // // //     },
// // // //     {
// // // //       id: "MHGJ3-2",
// // // //       category: "Frozen Food",
// // // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // // //       arrivalDate: "5:00 pm",
// // // //       weight: "10 kg",
// // // //       lastLocation: "Warehouse B",
// // // //     },
// // // //     {
// // // //       id: "MHGJ3-2",
// // // //       category: "Chemicals",
// // // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // // //       arrivalDate: "5:00 pm",
// // // //       weight: "10 kg",
// // // //       lastLocation: "Warehouse D",
// // // //     },
// // // //   ]

// // // //   filteredOrders: Order[] = []
// // // //   searchTerm = ""
// // // //   selectedDate = "23 March 2024"

// // // //   // For action menu
// // // //   activeActionMenu: string | null = null

// // // //   // For order details modal
// // // //   selectedOrderId: string | null = null
// // // //   isOrderDetailsVisible = false

// // // //   // For date picker
// // // //   showDatePicker = false

// // // //   // For filter menu
// // // //   showFilterMenu = false
// // // //   availableCategories: string[] = []
// // // //   availableLocations: string[] = []

// // // //   // Add a new property to the class
// // // //   showAddOrderModal = false

// // // //   filterOptions: FilterOptions = {
// // // //     categories: [],
// // // //     dateRange: {
// // // //       start: null,
// // // //       end: null,
// // // //     },
// // // //     locations: [],
// // // //   }

// // // //   constructor(private orderService: OrderService) {}

// // // //   ngOnInit(): void {
// // // //     this.filteredOrders = [...this.orders]

// // // //     // Extract unique categories and locations for filters
// // // //     this.availableCategories = [...new Set(this.orders.map((order) => order.category))]
// // // //     this.availableLocations = [...new Set(this.orders.map((order) => order.lastLocation))]

// // // //     // Add global click handler to close menus
// // // //     document.addEventListener("click", this.handleDocumentClick.bind(this))
// // // //   }

// // // //   // Add this method to handle document clicks
// // // //   handleDocumentClick(event: MouseEvent): void {
// // // //     // Only process if any menu is open
// // // //     if (this.showDatePicker || this.showFilterMenu || this.activeActionMenu) {
// // // //       const target = event.target as HTMLElement

// // // //       // Don't close menus if clicking inside them
// // // //       if (
// // // //         target.closest(".date-picker") ||
// // // //         target.closest(".date-trigger") ||
// // // //         target.closest(".filter-menu") ||
// // // //         target.closest(".filter-btn") ||
// // // //         target.closest(".action-menu") ||
// // // //         target.closest(".action-btn")
// // // //       ) {
// // // //         return
// // // //       }

// // // //       // Close all menus
// // // //       this.showDatePicker = false
// // // //       this.showFilterMenu = false
// // // //       this.activeActionMenu = null
// // // //     }
// // // //   }

// // // //   filterOrders(): void {
// // // //     // Start with all orders
// // // //     let filtered = [...this.orders]

// // // //     // Apply search term filter
// // // //     if (this.searchTerm.trim()) {
// // // //       const term = this.searchTerm.toLowerCase()
// // // //       filtered = filtered.filter(
// // // //         (order) =>
// // // //           order.id.toLowerCase().includes(term) ||
// // // //           order.category.toLowerCase().includes(term) ||
// // // //           order.origin.toLowerCase().includes(term) ||
// // // //           order.destination.toLowerCase().includes(term) ||
// // // //           order.lastLocation.toLowerCase().includes(term),
// // // //       )
// // // //     }

// // // //     // Apply category filters
// // // //     if (this.filterOptions.categories.length > 0) {
// // // //       filtered = filtered.filter((order) => this.filterOptions.categories.includes(order.category))
// // // //     }

// // // //     // Apply location filters
// // // //     if (this.filterOptions.locations.length > 0) {
// // // //       filtered = filtered.filter((order) => this.filterOptions.locations.includes(order.lastLocation))
// // // //     }

// // // //     // Apply date range filter (in a real app, you'd parse the dates properly)
// // // //     // This is a simplified example
// // // //     if (this.filterOptions.dateRange.start || this.filterOptions.dateRange.end) {
// // // //       // In a real app, you would convert the string dates to Date objects
// // // //       // and do proper date comparison
// // // //       console.log("Date filtering would be applied here")
// // // //     }

// // // //     this.filteredOrders = filtered
// // // //   }

// // // //   // Action menu methods
// // // //   showActionMenu(event: MouseEvent, orderId: string): void {
// // // //     event.stopPropagation()

// // // //     // Close the menu if it's already open for this order
// // // //     if (this.activeActionMenu === orderId) {
// // // //       this.activeActionMenu = null
// // // //       return
// // // //     }

// // // //     // Set the active menu
// // // //     this.activeActionMenu = orderId

// // // //     // Close other menus
// // // //     this.showDatePicker = false
// // // //     this.showFilterMenu = false

// // // //     // Position the menu next to the clicked button
// // // //     setTimeout(() => {
// // // //       const button = event.currentTarget as HTMLElement
// // // //       const menu = document.querySelector(".action-menu") as HTMLElement

// // // //       if (button && menu) {
// // // //         const rect = button.getBoundingClientRect()
// // // //         menu.style.top = rect.bottom + "px"
// // // //         menu.style.left = rect.left - menu.offsetWidth + button.offsetWidth + "px"
// // // //       }
// // // //     })
// // // //   }

// // // //   viewOrderDetails(orderId: string): void {
// // // //     this.selectedOrderId = orderId
// // // //     this.isOrderDetailsVisible = true
// // // //     this.activeActionMenu = null
// // // //   }

// // // //   editOrder(orderId: string): void {
// // // //     console.log("Edit order:", orderId)
// // // //     this.activeActionMenu = null
// // // //     // In a real app, you would navigate to an edit page or open an edit modal
// // // //   }

// // // //   deleteOrder(orderId: string): void {
// // // //     if (confirm("Are you sure you want to delete this order?")) {
// // // //       this.orderService.deleteOrder(orderId).subscribe(
// // // //         () => {
// // // //           // Remove the order from the arrays
// // // //           this.orders = this.orders.filter((order) => order.id !== orderId)
// // // //           this.filterOrders() // Re-apply filters to update the view
// // // //         },
// // // //         (error) => {
// // // //           console.error("Error deleting order:", error)
// // // //         },
// // // //       )
// // // //     }
// // // //     this.activeActionMenu = null
// // // //   }

// // // //   closeOrderDetails(): void {
// // // //     this.isOrderDetailsVisible = false
// // // //     this.selectedOrderId = null
// // // //   }

// // // //   // Date picker methods
// // // //   toggleDatePicker(event: MouseEvent): void {
// // // //     event.stopPropagation()
// // // //     this.showDatePicker = !this.showDatePicker

// // // //     // Close other menus
// // // //     if (this.showDatePicker) {
// // // //       this.showFilterMenu = false
// // // //       this.activeActionMenu = null
// // // //     }
// // // //   }

// // // //   resetDateFilter(): void {
// // // //     this.filterOptions.dateRange = {
// // // //       start: null,
// // // //       end: null,
// // // //     }
// // // //   }

// // // //   applyDateFilter(): void {
// // // //     // Update the displayed date
// // // //     if (this.filterOptions.dateRange.start && this.filterOptions.dateRange.end) {
// // // //       this.selectedDate = `${this.filterOptions.dateRange.start} - ${this.filterOptions.dateRange.end}`
// // // //     } else if (this.filterOptions.dateRange.start) {
// // // //       this.selectedDate = `From ${this.filterOptions.dateRange.start}`
// // // //     } else if (this.filterOptions.dateRange.end) {
// // // //       this.selectedDate = `Until ${this.filterOptions.dateRange.end}`
// // // //     } else {
// // // //       this.selectedDate = "23 March 2024" // Default date
// // // //     }

// // // //     this.applyFilters()
// // // //     this.showDatePicker = false
// // // //   }

// // // //   // Filter menu methods
// // // //   toggleFilterMenu(event: MouseEvent): void {
// // // //     event.stopPropagation()
// // // //     this.showFilterMenu = !this.showFilterMenu

// // // //     // Close other menus
// // // //     if (this.showFilterMenu) {
// // // //       this.showDatePicker = false
// // // //       this.activeActionMenu = null
// // // //     }
// // // //   }

// // // //   isFilterSelected(filterType: "categories" | "locations", value: string): boolean {
// // // //     return this.filterOptions[filterType].includes(value)
// // // //   }

// // // //   toggleFilter(filterType: "categories" | "locations", value: string): void {
// // // //     const index = this.filterOptions[filterType].indexOf(value)
// // // //     if (index === -1) {
// // // //       this.filterOptions[filterType].push(value)
// // // //     } else {
// // // //       this.filterOptions[filterType].splice(index, 1)
// // // //     }
// // // //   }

// // // //   resetFilters(): void {
// // // //     this.filterOptions = {
// // // //       categories: [],
// // // //       dateRange: {
// // // //         start: null,
// // // //         end: null,
// // // //       },
// // // //       locations: [],
// // // //     }
// // // //     this.selectedDate = "23 March 2024" // Reset to default date
// // // //     this.applyFilters()
// // // //   }

// // // //   applyFilters(): void {
// // // //     this.filterOrders()
// // // //     this.showFilterMenu = false
// // // //   }

// // // //   // Add a method to handle adding a new order
// // // //   addNewOrder(): void {
// // // //     this.showAddOrderModal = true
// // // //   }

// // // //   // Add a method to handle creating a new order
// // // //   createOrder(orderData: any): void {
// // // //     console.log("New order data:", orderData)
// // // //     // In a real app, you would call a service to save the order
// // // //     // this.orderService.createOrder(orderData).subscribe(...)

// // // //     // For now, just add a mock order to the list
// // // //     const newOrder: Order = {
// // // //       id: `MHGJ3-${Math.floor(Math.random() * 100)}`,
// // // //       category: orderData.orderType,
// // // //       origin: `${orderData.government}, ${orderData.city}`,
// // // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // // //       arrivalDate: "5:00 pm",
// // // //       weight: "10 kg",
// // // //       lastLocation: orderData.branch,
// // // //     }

// // // //     this.orders.unshift(newOrder)
// // // //     this.filterOrders()
// // // //   }

// // // //   // Add ngOnDestroy to clean up event listeners
// // // //   ngOnDestroy(): void {
// // // //     document.removeEventListener("click", this.handleDocumentClick.bind(this))
// // // //   }
// // // // }
// // // import { Component,  OnInit,  OnDestroy } from "@angular/core"
// // // import { CommonModule } from "@angular/common"
// // // import { FormsModule } from "@angular/forms"
// // // import { OrderService } from "../../../services/order.service"
// // // import { OrderDetailsComponent } from "../order-details/order-details.component"
// // // import { AddOrderModalComponent } from "../add-order-modal/add-order-modal.component"

// // // interface Order {
// // //   id: string
// // //   category: string
// // //   origin: string
// // //   destination: string
// // //   arrivalDate: string
// // //   weight: string
// // //   lastLocation: string
// // // }

// // // interface FilterOptions {
// // //   categories: string[]
// // //   dateRange: {
// // //     start: string | null
// // //     end: string | null
// // //   }
// // //   locations: string[]
// // // }

// // // @Component({
// // //   selector: "app-order-table",
// // //   standalone: true,
// // //   imports: [CommonModule, FormsModule, OrderDetailsComponent, AddOrderModalComponent],
// // //   template: `
// // //   <div class="order-table-container">
// // //     <div class="table-header">
// // //       <h3>Detail Information</h3>

// // //       <div class="header-actions">
// // //         <button class="add-order-btn" (click)="addNewOrder()">
// // //           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// // //             <line x1="12" y1="5" x2="12" y2="19"></line>
// // //             <line x1="5" y1="12" x2="19" y2="12"></line>
// // //           </svg>
// // //           Add New Order
// // //         </button>

// // //         <div class="date-display">
// // //           <div class="date-trigger" (click)="toggleDatePicker($event)">
// // //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// // //               <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
// // //               <line x1="16" y1="2" x2="16" y2="6"></line>
// // //               <line x1="8" y1="2" x2="8" y2="6"></line>
// // //               <line x1="3" y1="10" x2="21" y2="10"></line>
// // //             </svg>
// // //             <span>{{ selectedDate }}</span>
// // //           </div>

// // //           <!-- Date Picker Dropdown -->
// // //           <div class="date-picker" *ngIf="showDatePicker" (click)="$event.stopPropagation()">
// // //             <div class="date-picker-header">
// // //               <h4>Select Date Range</h4>
// // //               <button class="close-btn" (click)="toggleDatePicker($event)">×</button>
// // //             </div>
// // //             <div class="date-picker-content">
// // //               <div class="date-input">
// // //                 <label>Start Date</label>
// // //                 <input type="date" [(ngModel)]="filterOptions.dateRange.start">
// // //               </div>
// // //               <div class="date-input">
// // //                 <label>End Date</label>
// // //                 <input type="date" [(ngModel)]="filterOptions.dateRange.end">
// // //               </div>
// // //               <div class="date-actions">
// // //                 <button class="reset-btn" (click)="resetDateFilter()">Reset</button>
// // //                 <button class="apply-btn" (click)="applyDateFilter()">Apply</button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div class="filter-container">
// // //           <button class="filter-btn" (click)="toggleFilterMenu($event)">
// // //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// // //               <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
// // //             </svg>
// // //             Filter
// // //           </button>
// // //         </div>

// // //         <!-- Filter Menu Dropdown (moved outside to prevent nesting issues) -->
// // //         <div class="filter-menu" *ngIf="showFilterMenu" (click)="$event.stopPropagation()">
// // //           <div class="filter-menu-header">
// // //             <h4>Filter Options</h4>
// // //             <button class="close-btn" (click)="toggleFilterMenu($event)">×</button>
// // //           </div>
// // //           <div class="filter-menu-content">
// // //             <div class="filter-section">
// // //               <h5>Categories</h5>
// // //               <div class="checkbox-list">
// // //                 <div class="checkbox-item" *ngFor="let category of availableCategories">
// // //                   <input type="checkbox" [id]="'cat-' + category"
// // //                          [checked]="isFilterSelected('categories', category)"
// // //                          (change)="toggleFilter('categories', category)">
// // //                   <label [for]="'cat-' + category">{{ category }}</label>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //             <div class="filter-section">
// // //               <h5>Locations</h5>
// // //               <div class="checkbox-list">
// // //                 <div class="checkbox-item" *ngFor="let location of availableLocations">
// // //                   <input type="checkbox" [id]="'loc-' + location"
// // //                          [checked]="isFilterSelected('locations', location)"
// // //                          (change)="toggleFilter('locations', location)">
// // //                   <label [for]="'loc-' + location">{{ location }}</label>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //             <div class="filter-actions">
// // //               <button class="reset-btn" (click)="resetFilters()">Reset All</button>
// // //               <button class="apply-btn" (click)="applyFilters()">Apply Filters</button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div class="search-box">
// // //           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// // //             <circle cx="11" cy="11" r="8"></circle>
// // //             <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
// // //           </svg>
// // //           <input type="text" placeholder="Search" [(ngModel)]="searchTerm" (input)="filterOrders()">
// // //         </div>

// // //         <button class="add-new-order-btn" (click)="addNewOrder()">
// // //           Add New Order
// // //         </button>
// // //       </div>
// // //     </div>

// // //     <div class="table-wrapper">
// // //       <table class="order-table">
// // //         <thead>
// // //           <tr>
// // //             <th>Order ID</th>
// // //             <th>Category</th>
// // //             <th>Origin</th>
// // //             <th>Destination</th>
// // //             <th>Arrival Date</th>
// // //             <th>Weight</th>
// // //             <th>Last location</th>
// // //             <th>Action</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           <tr *ngFor="let order of filteredOrders">
// // //             <td>{{ order.id }}</td>
// // //             <td>{{ order.category }}</td>
// // //             <td>{{ order.origin }}</td>
// // //             <td>{{ order.destination }}</td>
// // //             <td>{{ order.arrivalDate }}</td>
// // //             <td>{{ order.weight }}</td>
// // //             <td>{{ order.lastLocation }}</td>
// // //             <td class="action-cell">
// // //               <button class="action-btn" (click)="showActionMenu($event, order.id)">
// // //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// // //                   <circle cx="12" cy="12" r="1"></circle>
// // //                   <circle cx="19" cy="12" r="1"></circle>
// // //                   <circle cx="5" cy="12" r="1"></circle>
// // //                 </svg>
// // //               </button>
// // //             </td>
// // //           </tr>
// // //           <tr *ngIf="filteredOrders.length === 0">
// // //             <td colspan="8" class="empty-message">No orders found matching your criteria</td>
// // //           </tr>
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   </div>

// // //   <!-- Add Order Modal -->
// // //   <app-add-order-modal
// // //     [isVisible]="showAddOrderModal"
// // //     (close)="showAddOrderModal = false"
// // //     (create)="createOrder($event)">
// // //   </app-add-order-modal>

// // //   <!-- Action Menu (moved outside to prevent multiple menus) -->
// // //   <div class="action-menu" *ngIf="activeActionMenu" (click)="$event.stopPropagation()">
// // //     <button class="menu-item" (click)="viewOrderDetails(activeActionMenu)">
// // //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// // //         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
// // //         <circle cx="12" cy="12" r="3"></circle>
// // //       </svg>
// // //       View
// // //     </button>
// // //     <button class="menu-item" (click)="editOrder(activeActionMenu)">
// // //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// // //         <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
// // //         <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
// // //       </svg>
// // //       Edit
// // //     </button>
// // //     <button class="menu-item delete" (click)="deleteOrder(activeActionMenu)">
// // //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// // //         <polyline points="3 6 5 6 21 6"></polyline>
// // //         <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
// // //       </svg>
// // //       Delete
// // //     </button>
// // //   </div>

// // //   <!-- Order Details Modal -->
// // //   <app-order-details
// // //     *ngIf="selectedOrderId"
// // //     [orderId]="selectedOrderId"
// // //     [isVisible]="isOrderDetailsVisible"
// // //     (close)="closeOrderDetails()">
// // //   </app-order-details>
// // // `,
// // //   styles: [
// // //     `
// // //   .order-table-container {
// // //     width: 100%;
// // //     position: relative;
// // //   }

// // //   .table-header {
// // //     display: flex;
// // //     justify-content: space-between;
// // //     align-items: center;
// // //     padding: 16px;
// // //     border-bottom: 1px solid #e2e8f0;

// // //     h3 {
// // //       font-size: 16px;
// // //       font-weight: 600;
// // //       color: #1e293b;
// // //       margin: 0;
// // //     }
// // //   }

// // //   .header-actions {
// // //     display: flex;
// // //     align-items: center;
// // //     gap: 12px;
// // //   }

// // //   .date-display {
// // //     position: relative;

// // //     .date-trigger {
// // //       display: flex;
// // //       align-items: center;
// // //       gap: 6px;
// // //       font-size: 14px;
// // //       color: #64748b;
// // //       cursor: pointer;
// // //       padding: 6px 12px;
// // //       border-radius: 4px;
// // //       background-color: #f1f5f9;

// // //       svg {
// // //         color: #64748b;
// // //       }

// // //       &:hover {
// // //         background-color: #e2e8f0;
// // //       }
// // //     }
// // //   }

// // //   .date-picker {
// // //     position: absolute;
// // //     top: 100%;
// // //     left: 0;
// // //     width: 280px;
// // //     background-color: white;
// // //     border-radius: 4px;
// // //     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
// // //     z-index: 100;
// // //     margin-top: 8px;
// // //   }

// // //   .date-picker-header {
// // //     display: flex;
// // //     justify-content: space-between;
// // //     align-items: center;
// // //     padding: 12px 16px;
// // //     border-bottom: 1px solid #e2e8f0;

// // //     h4 {
// // //       font-size: 14px;
// // //       font-weight: 600;
// // //       color: #1e293b;
// // //       margin: 0;
// // //     }

// // //     .close-btn {
// // //       background: none;
// // //       border: none;
// // //       font-size: 18px;
// // //       color: #64748b;
// // //       cursor: pointer;

// // //       &:hover {
// // //         color: #1e293b;
// // //       }
// // //     }
// // //   }

// // //   .date-picker-content {
// // //     padding: 16px;
// // //   }

// // //   .date-input {
// // //     margin-bottom: 12px;

// // //     label {
// // //       display: block;
// // //       font-size: 12px;
// // //       color: #64748b;
// // //       margin-bottom: 4px;
// // //     }

// // //     input {
// // //       width: 100%;
// // //       padding: 8px;
// // //       border: 1px solid #e2e8f0;
// // //       border-radius: 4px;
// // //       font-size: 14px;
// // //       color: #1e293b;

// // //       &:focus {
// // //         outline: none;
// // //         border-color: #064e3b;
// // //       }
// // //     }
// // //   }

// // //   .date-actions {
// // //     display: flex;
// // //     justify-content: flex-end;
// // //     gap: 8px;
// // //     margin-top: 16px;
// // //   }

// // //   .filter-container {
// // //     position: relative;
// // //   }

// // //   .filter-btn {
// // //     display: flex;
// // //     align-items: center;
// // //     gap: 6px;
// // //     background-color: #f1f5f9;
// // //     border: none;
// // //     border-radius: 4px;
// // //     padding: 6px 12px;
// // //     font-size: 14px;
// // //     color: #1e293b;
// // //     cursor: pointer;

// // //     &:hover {
// // //       background-color: #e2e8f0;
// // //     }
// // //   }

// // //   .filter-menu {
// // //     position: absolute;
// // //     top: 100%;
// // //     right: 0;
// // //     width: 280px;
// // //     background-color: white;
// // //     border-radius: 4px;
// // //     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
// // //     z-index: 1000;
// // //     margin-top: 8px;
// // //     max-height: 80vh;
// // //     overflow-y: auto;
// // //   }

// // //   .filter-menu-header {
// // //     display: flex;
// // //     justify-content: space-between;
// // //     align-items: center;
// // //     padding: 12px 16px;
// // //     border-bottom: 1px solid #e2e8f0;

// // //     h4 {
// // //       font-size: 14px;
// // //       font-weight: 600;
// // //       color: #1e293b;
// // //       margin: 0;
// // //     }

// // //     .close-btn {
// // //       background: none;
// // //       border: none;
// // //       font-size: 18px;
// // //       color: #64748b;
// // //       cursor: pointer;

// // //       &:hover {
// // //         color: #1e293b;
// // //       }
// // //     }
// // //   }

// // //   .filter-menu-content {
// // //     padding: 16px;
// // //   }

// // //   .filter-section {
// // //     margin-bottom: 16px;

// // //     h5 {
// // //       font-size: 14px;
// // //       font-weight: 500;
// // //       color: #1e293b;
// // //       margin: 0 0 8px 0;
// // //     }
// // //   }

// // //   .checkbox-list {
// // //     display: flex;
// // //     flex-direction: column;
// // //     gap: 8px;
// // //   }

// // //   .checkbox-item {
// // //     display: flex;
// // //     align-items: center;
// // //     gap: 8px;

// // //     label {
// // //       font-size: 14px;
// // //       color: #1e293b;
// // //       cursor: pointer;
// // //     }
// // //   }

// // //   .filter-actions {
// // //     display: flex;
// // //     justify-content: flex-end;
// // //     gap: 8px;
// // //     margin-top: 16px;
// // //     position: sticky;
// // //     bottom: 0;
// // //     padding: 8px 0;
// // //     background-color: white;
// // //     border-top: 1px solid #e2e8f0;
// // //   }

// // //   .reset-btn {
// // //     background-color: white;
// // //     border: 1px solid #e2e8f0;
// // //     border-radius: 4px;
// // //     padding: 6px 12px;
// // //     font-size: 14px;
// // //     color: #64748b;
// // //     cursor: pointer;

// // //     &:hover {
// // //       background-color: #f1f5f9;
// // //     }
// // //   }

// // //   .apply-btn {
// // //     background-color: #064e3b;
// // //     border: none;
// // //     border-radius: 4px;
// // //     padding: 6px 12px;
// // //     font-size: 14px;
// // //     color: white;
// // //     cursor: pointer;

// // //     &:hover {
// // //       background-color: #065f46;
// // //     }
// // //   }

// // //   .search-box {
// // //     display: flex;
// // //     align-items: center;
// // //     gap: 6px;
// // //     background-color: #f1f5f9;
// // //     border-radius: 4px;
// // //     padding: 6px 12px;
// // //     width: 180px;

// // //     svg {
// // //       color: #64748b;
// // //     }

// // //     input {
// // //       border: none;
// // //       background: none;
// // //       outline: none;
// // //       font-size: 14px;
// // //       color: #1e293b;
// // //       width: 100%;

// // //       &::placeholder {
// // //         color: #64748b;
// // //       }
// // //     }
// // //   }

// // //   .table-wrapper {
// // //     overflow-x: auto;
// // //   }

// // //   .order-table {
// // //     width: 100%;
// // //     border-collapse: collapse;

// // //     th, td {
// // //       padding: 12px 16px;
// // //       text-align: left;
// // //       font-size: 14px;
// // //     }

// // //     th {
// // //       color: #64748b;
// // //       font-weight: 500;
// // //       background-color: #f8fafc;
// // //     }

// // //     td {
// // //       color: #1e293b;
// // //       border-bottom: 1px solid #f1f5f9;
// // //     }
// // //   }

// // //   .action-cell {
// // //     position: relative;
// // //   }

// // //   .action-btn {
// // //     background: none;
// // //     border: none;
// // //     cursor: pointer;
// // //     color: #64748b;

// // //     &:hover {
// // //       color: #1e293b;
// // //     }
// // //   }

// // //   .action-menu {
// // //     position: fixed;
// // //     width: 120px;
// // //     background-color: white;
// // //     border-radius: 4px;
// // //     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
// // //     z-index: 1000;
// // //     overflow: hidden;
// // //   }

// // //   .menu-item {
// // //     display: flex;
// // //     align-items: center;
// // //     gap: 8px;
// // //     width: 100%;
// // //     padding: 8px 12px;
// // //     border: none;
// // //     background: none;
// // //     text-align: left;
// // //     font-size: 14px;
// // //     color: #1e293b;
// // //     cursor: pointer;

// // //     &:hover {
// // //       background-color: #f1f5f9;
// // //     }

// // //     &.delete {
// // //       color: #ef4444;

// // //       &:hover {
// // //         background-color: #fee2e2;
// // //       }
// // //     }
// // //   }

// // //   .empty-message {
// // //     text-align: center;
// // //     padding: 24px;
// // //     color: #64748b;
// // //   }

// // //   .add-new-order-btn {
// // //     background-color: #064e3b;
// // //     border: none;
// // //     border-radius: 4px;
// // //     padding: 6px 12px;
// // //     font-size: 14px;
// // //     color: white;
// // //     cursor: pointer;

// // //     &:hover {
// // //       background-color: #065f46;
// // //     }
// // //   }

// // //   .add-order-btn {
// // //     display: flex;
// // //     align-items: center;
// // //     gap: 6px;
// // //     background-color: #064e3b;
// // //     border: none;
// // //     border-radius: 4px;
// // //     padding: 6px 12px;
// // //     font-size: 14px;
// // //     color: white;
// // //     cursor: pointer;

// // //     &:hover {
// // //       background-color: #065f46;
// // //     }

// // //     svg {
// // //       color: white;
// // //     }
// // //   }
// // //   `,
// // //   ],
// // // })
// // // export class OrderTableComponent implements OnInit, OnDestroy {
// // //   orders: Order[] = [
// // //     {
// // //       id: "MHGJ3-0",
// // //       category: "Electronic",
// // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // //       arrivalDate: "5:00 pm",
// // //       weight: "10 kg",
// // //       lastLocation: "Warehouse A",
// // //     },
// // //     {
// // //       id: "MHGJ3-2",
// // //       category: "Fashion",
// // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // //       arrivalDate: "5:00 pm",
// // //       weight: "10 kg",
// // //       lastLocation: "Warehouse A",
// // //     },
// // //     {
// // //       id: "MHGJ3-0",
// // //       category: "Food",
// // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // //       arrivalDate: "5:00 pm",
// // //       weight: "10 kg",
// // //       lastLocation: "Warehouse A",
// // //     },
// // //     {
// // //       id: "MHGJ3-2",
// // //       category: "Furniture",
// // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // //       arrivalDate: "5:00 pm",
// // //       weight: "10 kg",
// // //       lastLocation: "Warehouse A",
// // //     },
// // //     {
// // //       id: "MHGJ3-2",
// // //       category: "Frozen Food",
// // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // //       arrivalDate: "5:00 pm",
// // //       weight: "10 kg",
// // //       lastLocation: "Warehouse B",
// // //     },
// // //     {
// // //       id: "MHGJ3-2",
// // //       category: "Auto Parts",
// // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // //       arrivalDate: "5:00 pm",
// // //       weight: "10 kg",
// // //       lastLocation: "Warehouse C",
// // //     },
// // //     {
// // //       id: "MHGJ3-2",
// // //       category: "Frozen Food",
// // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // //       arrivalDate: "5:00 pm",
// // //       weight: "10 kg",
// // //       lastLocation: "Warehouse B",
// // //     },
// // //     {
// // //       id: "MHGJ3-2",
// // //       category: "Chemicals",
// // //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // //       arrivalDate: "5:00 pm",
// // //       weight: "10 kg",
// // //       lastLocation: "Warehouse D",
// // //     },
// // //   ]

// // //   filteredOrders: Order[] = []
// // //   searchTerm = ""
// // //   selectedDate = "23 March 2024"

// // //   // For action menu
// // //   activeActionMenu: string | null = null

// // //   // For order details modal
// // //   selectedOrderId: string | null = null
// // //   isOrderDetailsVisible = false

// // //   // For date picker
// // //   showDatePicker = false

// // //   // For filter menu
// // //   showFilterMenu = false
// // //   availableCategories: string[] = []
// // //   availableLocations: string[] = []

// // //   // Add a new property to the class
// // //   showAddOrderModal = false

// // //   filterOptions: FilterOptions = {
// // //     categories: [],
// // //     dateRange: {
// // //       start: null,
// // //       end: null,
// // //     },
// // //     locations: [],
// // //   }

// // //   constructor(private orderService: OrderService) {}

// // //   ngOnInit(): void {
// // //     this.filteredOrders = [...this.orders]

// // //     // Extract unique categories and locations for filters
// // //     this.availableCategories = [...new Set(this.orders.map((order) => order.category))]
// // //     this.availableLocations = [...new Set(this.orders.map((order) => order.lastLocation))]

// // //     // Add global click handler to close menus
// // //     document.addEventListener("click", this.handleDocumentClick.bind(this))
// // //   }

// // //   // Add this method to handle document clicks
// // //   handleDocumentClick(event: MouseEvent): void {
// // //     // Only process if any menu is open
// // //     if (this.showDatePicker || this.showFilterMenu || this.activeActionMenu) {
// // //       const target = event.target as HTMLElement

// // //       // Don't close menus if clicking inside them
// // //       if (
// // //         target.closest(".date-picker") ||
// // //         target.closest(".date-trigger") ||
// // //         target.closest(".filter-menu") ||
// // //         target.closest(".filter-btn") ||
// // //         target.closest(".action-menu") ||
// // //         target.closest(".action-btn")
// // //       ) {
// // //         return
// // //       }

// // //       // Close all menus
// // //       this.showDatePicker = false
// // //       this.showFilterMenu = false
// // //       this.activeActionMenu = null
// // //     }
// // //   }

// // //   filterOrders(): void {
// // //     // Start with all orders
// // //     let filtered = [...this.orders]

// // //     // Apply search term filter
// // //     if (this.searchTerm.trim()) {
// // //       const term = this.searchTerm.toLowerCase()
// // //       filtered = filtered.filter(
// // //         (order) =>
// // //           order.id.toLowerCase().includes(term) ||
// // //           order.category.toLowerCase().includes(term) ||
// // //           order.origin.toLowerCase().includes(term) ||
// // //           order.destination.toLowerCase().includes(term) ||
// // //           order.lastLocation.toLowerCase().includes(term),
// // //       )
// // //     }

// // //     // Apply category filters
// // //     if (this.filterOptions.categories.length > 0) {
// // //       filtered = filtered.filter((order) => this.filterOptions.categories.includes(order.category))
// // //     }

// // //     // Apply location filters
// // //     if (this.filterOptions.locations.length > 0) {
// // //       filtered = filtered.filter((order) => this.filterOptions.locations.includes(order.lastLocation))
// // //     }

// // //     // Apply date range filter (in a real app, you'd parse the dates properly)
// // //     // This is a simplified example
// // //     if (this.filterOptions.dateRange.start || this.filterOptions.dateRange.end) {
// // //       // In a real app, you would convert the string dates to Date objects
// // //       // and do proper date comparison
// // //       console.log("Date filtering would be applied here")
// // //     }

// // //     this.filteredOrders = filtered
// // //   }

// // //   // Action menu methods
// // //   showActionMenu(event: MouseEvent, orderId: string): void {
// // //     event.stopPropagation()

// // //     // Close the menu if it's already open for this order
// // //     if (this.activeActionMenu === orderId) {
// // //       this.activeActionMenu = null
// // //       return
// // //     }

// // //     // Set the active menu
// // //     this.activeActionMenu = orderId

// // //     // Close other menus
// // //     this.showDatePicker = false
// // //     this.showFilterMenu = false

// // //     // Position the menu next to the clicked button
// // //     setTimeout(() => {
// // //       const button = event.currentTarget as HTMLElement
// // //       const menu = document.querySelector(".action-menu") as HTMLElement

// // //       if (button && menu) {
// // //         const rect = button.getBoundingClientRect()
// // //         menu.style.top = rect.bottom + "px"
// // //         menu.style.left = rect.left - menu.offsetWidth + button.offsetWidth + "px"
// // //       }
// // //     })
// // //   }

// // //   viewOrderDetails(orderId: string): void {
// // //     this.selectedOrderId = orderId
// // //     this.isOrderDetailsVisible = true
// // //     this.activeActionMenu = null
// // //   }

// // //   editOrder(orderId: string): void {
// // //     console.log("Edit order:", orderId)
// // //     this.activeActionMenu = null
// // //     // In a real app, you would navigate to an edit page or open an edit modal
// // //   }

// // //   deleteOrder(orderId: string): void {
// // //     if (confirm("Are you sure you want to delete this order?")) {
// // //       this.orderService.deleteOrder(orderId).subscribe(
// // //         () => {
// // //           // Remove the order from the arrays
// // //           this.orders = this.orders.filter((order) => order.id !== orderId)
// // //           this.filterOrders() // Re-apply filters to update the view
// // //         },
// // //         (error) => {
// // //           console.error("Error deleting order:", error)
// // //         },
// // //       )
// // //     }
// // //     this.activeActionMenu = null
// // //   }

// // //   closeOrderDetails(): void {
// // //     this.isOrderDetailsVisible = false
// // //     this.selectedOrderId = null
// // //   }

// // //   // Date picker methods
// // //   toggleDatePicker(event: MouseEvent): void {
// // //     event.stopPropagation()
// // //     this.showDatePicker = !this.showDatePicker

// // //     // Close other menus
// // //     if (this.showDatePicker) {
// // //       this.showFilterMenu = false
// // //       this.activeActionMenu = null
// // //     }
// // //   }

// // //   resetDateFilter(): void {
// // //     this.filterOptions.dateRange = {
// // //       start: null,
// // //       end: null,
// // //     }
// // //   }

// // //   applyDateFilter(): void {
// // //     // Update the displayed date
// // //     if (this.filterOptions.dateRange.start && this.filterOptions.dateRange.end) {
// // //       this.selectedDate = `${this.filterOptions.dateRange.start} - ${this.filterOptions.dateRange.end}`
// // //     } else if (this.filterOptions.dateRange.start) {
// // //       this.selectedDate = `From ${this.filterOptions.dateRange.start}`
// // //     } else if (this.filterOptions.dateRange.end) {
// // //       this.selectedDate = `Until ${this.filterOptions.dateRange.end}`
// // //     } else {
// // //       this.selectedDate = "23 March 2024" // Default date
// // //     }

// // //     this.applyFilters()
// // //     this.showDatePicker = false
// // //   }

// // //   // Filter menu methods
// // //   toggleFilterMenu(event: MouseEvent): void {
// // //     event.stopPropagation()
// // //     this.showFilterMenu = !this.showFilterMenu

// // //     // Close other menus
// // //     if (this.showFilterMenu) {
// // //       this.showDatePicker = false
// // //       this.activeActionMenu = null
// // //     }
// // //   }

// // //   isFilterSelected(filterType: "categories" | "locations", value: string): boolean {
// // //     return this.filterOptions[filterType].includes(value)
// // //   }

// // //   toggleFilter(filterType: "categories" | "locations", value: string): void {
// // //     const index = this.filterOptions[filterType].indexOf(value)
// // //     if (index === -1) {
// // //       this.filterOptions[filterType].push(value)
// // //     } else {
// // //       this.filterOptions[filterType].splice(index, 1)
// // //     }
// // //   }

// // //   resetFilters(): void {
// // //     this.filterOptions = {
// // //       categories: [],
// // //       dateRange: {
// // //         start: null,
// // //         end: null,
// // //       },
// // //       locations: [],
// // //     }
// // //     this.selectedDate = "23 March 2024" // Reset to default date
// // //     this.applyFilters()
// // //   }

// // //   applyFilters(): void {
// // //     this.filterOrders()
// // //     this.showFilterMenu = false
// // //   }

// // //   // Add a method to handle adding a new order
// // //   addNewOrder(): void {
// // //     this.showAddOrderModal = true
// // //   }

// // //   // Add a method to handle creating a new order
// // //   createOrder(orderData: any): void {
// // //     console.log("New order data:", orderData)
// // //     // In a real app, you would call a service to save the order
// // //     // this.orderService.createOrder(orderData).subscribe(...)

// // //     // For now, just add a mock order to the list
// // //     const newOrder: Order = {
// // //       id: `MHGJ3-${Math.floor(Math.random() * 100)}`,
// // //       category: orderData.orderType,
// // //       origin: `${orderData.government}, ${orderData.city}`,
// // //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// // //       arrivalDate: "5:00 pm",
// // //       weight: "10 kg",
// // //       lastLocation: orderData.branch,
// // //     }

// // //     this.orders.unshift(newOrder)
// // //     this.filterOrders()
// // //   }

// // //   // Add ngOnDestroy to clean up event listeners
// // //   ngOnDestroy(): void {
// // //     document.removeEventListener("click", this.handleDocumentClick.bind(this))
// // //   }
// // // }
// // import { Component, OnInit,  OnDestroy } from "@angular/core"
// // import { CommonModule } from "@angular/common"
// // import { FormsModule } from "@angular/forms"
// // import  { OrderService } from "../../../services/order.service"
// // import { OrderDetailsComponent } from "../order-details/order-details.component"
// // import { AddOrderModalComponent } from "../add-order-modal/add-order-modal.component"

// // // Update the Order interface to include the new fields
// // interface Order {
// //   id: string
// //   date: string
// //   customerName: string
// //   government: string
// //   city: string
// //   orderCost: string
// //   category?: string
// //   origin?: string
// //   destination?: string
// //   arrivalDate?: string
// //   weight?: string
// //   lastLocation?: string
// // }

// // // Update the FilterOptions interface to include government and city
// // interface FilterOptions {
// //   categories: string[]
// //   governments: string[]
// //   cities: string[]
// //   dateRange: {
// //     start: string | null
// //     end: string | null
// //   }
// //   locations: string[]
// // }

// // @Component({
// //   selector: "app-order-table",
// //   standalone: true,
// //   imports: [CommonModule, FormsModule, OrderDetailsComponent, AddOrderModalComponent],
// //   template: `
// //   <div class="order-table-container">
// //     <div class="table-header">
// //       <h3>Detail Information</h3>

// //       <div class="header-actions">
// //         <button class="add-order-btn" (click)="addNewOrder()">
// //           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// //             <line x1="12" y1="5" x2="12" y2="19"></line>
// //             <line x1="5" y1="12" x2="19" y2="12"></line>
// //           </svg>
// //           Add New Order
// //         </button>

// //         <div class="date-display">
// //           <div class="date-trigger" (click)="toggleDatePicker($event)">
// //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// //               <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
// //               <line x1="16" y1="2" x2="16" y2="6"></line>
// //               <line x1="8" y1="2" x2="8" y2="6"></line>
// //               <line x1="3" y1="10" x2="21" y2="10"></line>
// //             </svg>
// //             <span>{{ selectedDate }}</span>
// //           </div>

// //           <!-- Date Picker Dropdown -->
// //           <div class="date-picker" *ngIf="showDatePicker" (click)="$event.stopPropagation()">
// //             <div class="date-picker-header">
// //               <h4>Select Date Range</h4>
// //               <button class="close-btn" (click)="toggleDatePicker($event)">×</button>
// //             </div>
// //             <div class="date-picker-content">
// //               <div class="date-input">
// //                 <label>Start Date</label>
// //                 <input type="date" [(ngModel)]="filterOptions.dateRange.start">
// //               </div>
// //               <div class="date-input">
// //                 <label>End Date</label>
// //                 <input type="date" [(ngModel)]="filterOptions.dateRange.end">
// //               </div>
// //               <div class="date-actions">
// //                 <button class="reset-btn" (click)="resetDateFilter()">Reset</button>
// //                 <button class="apply-btn" (click)="applyDateFilter()">Apply</button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div class="filter-container">
// //           <button class="filter-btn" (click)="toggleFilterMenu($event)">
// //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// //               <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
// //             </svg>
// //             Filter
// //           </button>
// //         </div>

// //         <!-- Filter Menu Dropdown (moved outside to prevent nesting issues) -->
// //         <div class="filter-menu" *ngIf="showFilterMenu" (click)="$event.stopPropagation()">
// //           <div class="filter-menu-header">
// //             <h4>Filter Options</h4>
// //             <button class="close-btn" (click)="toggleFilterMenu($event)">×</button>
// //           </div>
// //           <div class="filter-menu-content">
// //             <div class="filter-section">
// //               <h5>Government</h5>
// //               <div class="checkbox-list">
// //                 <div class="checkbox-item" *ngFor="let government of availableGovernments">
// //                   <input type="checkbox" [id]="'gov-' + government"
// //                          [checked]="isFilterSelected('governments', government)"
// //                          (change)="toggleFilter('governments', government)">
// //                   <label [for]="'gov-' + government">{{ government }}</label>
// //                 </div>
// //               </div>
// //             </div>
// //             <div class="filter-section">
// //               <h5>City</h5>
// //               <div class="checkbox-list">
// //                 <div class="checkbox-item" *ngFor="let city of availableCities">
// //                   <input type="checkbox" [id]="'city-' + city"
// //                          [checked]="isFilterSelected('cities', city)"
// //                          (change)="toggleFilter('cities', city)">
// //                   <label [for]="'city-' + city">{{ city }}</label>
// //                 </div>
// //               </div>
// //             </div>
// //             <div class="filter-section">
// //               <h5>Categories</h5>
// //               <div class="checkbox-list">
// //                 <div class="checkbox-item" *ngFor="let category of availableCategories">
// //                   <input type="checkbox" [id]="'cat-' + category"
// //                          [checked]="isFilterSelected('categories', category)"
// //                          (change)="toggleFilter('categories', category)">
// //                   <label [for]="'cat-' + category">{{ category }}</label>
// //                 </div>
// //               </div>
// //             </div>
// //             <div class="filter-actions">
// //               <button class="reset-btn" (click)="resetFilters()">Reset All</button>
// //               <button class="apply-btn" (click)="applyFilters()">Apply Filters</button>
// //             </div>
// //           </div>
// //         </div>

// //         <div class="search-box">
// //           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// //             <circle cx="11" cy="11" r="8"></circle>
// //             <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
// //           </svg>
// //           <input type="text" placeholder="Search" [(ngModel)]="searchTerm" (input)="filterOrders()">
// //         </div>

// //         <button class="add-new-order-btn" (click)="addNewOrder()">
// //           Add New Order
// //         </button>
// //       </div>
// //     </div>

// //     <div class="table-wrapper">
// //       <table class="order-table">
// //         <thead>
// //           <tr>
// //             <th>Order ID</th>
// //             <th>Date</th>
// //             <th>Customer Name</th>
// //             <th>Government</th>
// //             <th>City</th>
// //             <th>Order Cost</th>
// //             <th>Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           <tr *ngFor="let order of filteredOrders">
// //             <td>{{ order.id }}</td>
// //             <td>{{ order.date }}</td>
// //             <td>{{ order.customerName }}</td>
// //             <td>{{ order.government }}</td>
// //             <td>{{ order.city }}</td>
// //             <td>{{ order.orderCost }}</td>
// //             <td class="action-cell">
// //               <button class="action-btn" (click)="showActionMenu($event, order.id)">
// //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// //                   <circle cx="12" cy="12" r="1"></circle>
// //                   <circle cx="19" cy="12" r="1"></circle>
// //                   <circle cx="5" cy="12" r="1"></circle>
// //                 </svg>
// //               </button>
// //             </td>
// //           </tr>
// //           <tr *ngIf="filteredOrders.length === 0">
// //             <td colspan="7" class="empty-message">No orders found matching your criteria</td>
// //           </tr>
// //         </tbody>
// //       </table>
// //     </div>
// //   </div>

// //   <!-- Add Order Modal -->
// //   <app-add-order-modal
// //     [isVisible]="showAddOrderModal"
// //     (close)="showAddOrderModal = false"
// //     (create)="createOrder($event)">
// //   </app-add-order-modal>

// //   <!-- Action Menu (moved outside to prevent multiple menus) -->
// //   <div class="action-menu" *ngIf="activeActionMenu" (click)="$event.stopPropagation()">
// //     <button class="menu-item" (click)="viewOrderDetails(activeActionMenu)">
// //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// //         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
// //         <circle cx="12" cy="12" r="3"></circle>
// //       </svg>
// //       View
// //     </button>
// //     <button class="menu-item" (click)="editOrder(activeActionMenu)">
// //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// //         <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
// //         <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
// //       </svg>
// //       Edit
// //     </button>
// //     <button class="menu-item delete" (click)="deleteOrder(activeActionMenu)">
// //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
// //         <polyline points="3 6 5 6 21 6"></polyline>
// //         <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
// //       </svg>
// //       Delete
// //     </button>
// //   </div>

// //   <!-- Order Details Modal -->
// //   <app-order-details
// //     *ngIf="selectedOrderId"
// //     [orderId]="selectedOrderId"
// //     [isVisible]="isOrderDetailsVisible"
// //     (close)="closeOrderDetails()">
// //   </app-order-details>
// // `,
// //   styles: [
// //     `
// //   .order-table-container {
// //     width: 100%;
// //     position: relative;
// //   }

// //   .table-header {
// //     display: flex;
// //     justify-content: space-between;
// //     align-items: center;
// //     padding: 16px;
// //     border-bottom: 1px solid #e2e8f0;

// //     h3 {
// //       font-size: 16px;
// //       font-weight: 600;
// //       color: #1e293b;
// //       margin: 0;
// //     }
// //   }

// //   .header-actions {
// //     display: flex;
// //     align-items: center;
// //     gap: 12px;
// //   }

// //   .date-display {
// //     position: relative;

// //     .date-trigger {
// //       display: flex;
// //       align-items: center;
// //       gap: 6px;
// //       font-size: 14px;
// //       color: #64748b;
// //       cursor: pointer;
// //       padding: 6px 12px;
// //       border-radius: 4px;
// //       background-color: #f1f5f9;

// //       svg {
// //         color: #64748b;
// //       }

// //       &:hover {
// //         background-color: #e2e8f0;
// //       }
// //     }
// //   }

// //   .date-picker {
// //     position: absolute;
// //     top: 100%;
// //     left: 0;
// //     width: 280px;
// //     background-color: white;
// //     border-radius: 4px;
// //     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
// //     z-index: 100;
// //     margin-top: 8px;
// //   }

// //   .date-picker-header {
// //     display: flex;
// //     justify-content: space-between;
// //     align-items: center;
// //     padding: 12px 16px;
// //     border-bottom: 1px solid #e2e8f0;

// //     h4 {
// //       font-size: 14px;
// //       font-weight: 600;
// //       color: #1e293b;
// //       margin: 0;
// //     }

// //     .close-btn {
// //       background: none;
// //       border: none;
// //       font-size: 18px;
// //       color: #64748b;
// //       cursor: pointer;

// //       &:hover {
// //         color: #1e293b;
// //       }
// //     }
// //   }

// //   .date-picker-content {
// //     padding: 16px;
// //   }

// //   .date-input {
// //     margin-bottom: 12px;

// //     label {
// //       display: block;
// //       font-size: 12px;
// //       color: #64748b;
// //       margin-bottom: 4px;
// //     }

// //     input {
// //       width: 100%;
// //       padding: 8px;
// //       border: 1px solid #e2e8f0;
// //       border-radius: 4px;
// //       font-size: 14px;
// //       color: #1e293b;

// //       &:focus {
// //         outline: none;
// //         border-color: #064e3b;
// //       }
// //     }
// //   }

// //   .date-actions {
// //     display: flex;
// //     justify-content: flex-end;
// //     gap: 8px;
// //     margin-top: 16px;
// //   }

// //   .filter-container {
// //     position: relative;
// //   }

// //   .filter-btn {
// //     display: flex;
// //     align-items: center;
// //     gap: 6px;
// //     background-color: #f1f5f9;
// //     border: none;
// //     border-radius: 4px;
// //     padding: 6px 12px;
// //     font-size: 14px;
// //     color: #1e293b;
// //     cursor: pointer;

// //     &:hover {
// //       background-color: #e2e8f0;
// //     }
// //   }

// //   .filter-menu {
// //     position: absolute;
// //     top: 100%;
// //     right: 0;
// //     width: 280px;
// //     background-color: white;
// //     border-radius: 4px;
// //     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
// //     z-index: 1000;
// //     margin-top: 8px;
// //     max-height: 80vh;
// //     overflow-y: auto;
// //   }

// //   .filter-menu-header {
// //     display: flex;
// //     justify-content: space-between;
// //     align-items: center;
// //     padding: 12px 16px;
// //     border-bottom: 1px solid #e2e8f0;

// //     h4 {
// //       font-size: 14px;
// //       font-weight: 600;
// //       color: #1e293b;
// //       margin: 0;
// //     }

// //     .close-btn {
// //       background: none;
// //       border: none;
// //       font-size: 18px;
// //       color: #64748b;
// //       cursor: pointer;

// //       &:hover {
// //         color: #1e293b;
// //       }
// //     }
// //   }

// //   .filter-menu-content {
// //     padding: 16px;
// //   }

// //   .filter-section {
// //     margin-bottom: 16px;

// //     h5 {
// //       font-size: 14px;
// //       font-weight: 500;
// //       color: #1e293b;
// //       margin: 0 0 8px 0;
// //     }
// //   }

// //   .checkbox-list {
// //     display: flex;
// //     flex-direction: column;
// //     gap: 8px;
// //   }

// //   .checkbox-item {
// //     display: flex;
// //     align-items: center;
// //     gap: 8px;

// //     label {
// //       font-size: 14px;
// //       color: #1e293b;
// //       cursor: pointer;
// //     }
// //   }

// //   .filter-actions {
// //     display: flex;
// //     justify-content: flex-end;
// //     gap: 8px;
// //     margin-top: 16px;
// //     position: sticky;
// //     bottom: 0;
// //     padding: 8px 0;
// //     background-color: white;
// //     border-top: 1px solid #e2e8f0;
// //   }

// //   .reset-btn {
// //     background-color: white;
// //     border: 1px solid #e2e8f0;
// //     border-radius: 4px;
// //     padding: 6px 12px;
// //     font-size: 14px;
// //     color: #64748b;
// //     cursor: pointer;

// //     &:hover {
// //       background-color: #f1f5f9;
// //     }
// //   }

// //   .apply-btn {
// //     background-color: #064e3b;
// //     border: none;
// //     border-radius: 4px;
// //     padding: 6px 12px;
// //     font-size: 14px;
// //     color: white;
// //     cursor: pointer;

// //     &:hover {
// //       background-color: #065f46;
// //     }
// //   }

// //   .search-box {
// //     display: flex;
// //     align-items: center;
// //     gap: 6px;
// //     background-color: #f1f5f9;
// //     border-radius: 4px;
// //     padding: 6px 12px;
// //     width: 180px;

// //     svg {
// //       color: #64748b;
// //     }

// //     input {
// //       border: none;
// //       background: none;
// //       outline: none;
// //       font-size: 14px;
// //       color: #1e293b;
// //       width: 100%;

// //       &::placeholder {
// //         color: #64748b;
// //       }
// //     }
// //   }

// //   .table-wrapper {
// //     overflow-x: auto;
// //   }

// //   .order-table {
// //     width: 100%;
// //     border-collapse: collapse;

// //     th, td {
// //       padding: 12px 16px;
// //       text-align: left;
// //       font-size: 14px;
// //     }

// //     th {
// //       color: #64748b;
// //       font-weight: 500;
// //       background-color: #f8fafc;
// //     }

// //     td {
// //       color: #1e293b;
// //       border-bottom: 1px solid #f1f5f9;
// //     }
// //   }

// //   .action-cell {
// //     position: relative;
// //   }

// //   .action-btn {
// //     background: none;
// //     border: none;
// //     cursor: pointer;
// //     color: #64748b;

// //     &:hover {
// //       color: #1e293b;
// //     }
// //   }

// //   .action-menu {
// //     position: fixed;
// //     width: 120px;
// //     background-color: white;
// //     border-radius: 4px;
// //     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
// //     z-index: 1000;
// //     overflow: hidden;
// //   }

// //   .menu-item {
// //     display: flex;
// //     align-items: center;
// //     gap: 8px;
// //     width: 100%;
// //     padding: 8px 12px;
// //     border: none;
// //     background: none;
// //     text-align: left;
// //     font-size: 14px;
// //     color: #1e293b;
// //     cursor: pointer;

// //     &:hover {
// //       background-color: #f1f5f9;
// //     }

// //     &.delete {
// //       color: #ef4444;

// //       &:hover {
// //         background-color: #fee2e2;
// //       }
// //     }
// //   }

// //   .empty-message {
// //     text-align: center;
// //     padding: 24px;
// //     color: #64748b;
// //   }

// //   .add-new-order-btn {
// //     background-color: #064e3b;
// //     border: none;
// //     border-radius: 4px;
// //     padding: 6px 12px;
// //     font-size: 14px;
// //     color: white;
// //     cursor: pointer;

// //     &:hover {
// //       background-color: #065f46;
// //     }
// //   }

// //   .add-order-btn {
// //     display: flex;
// //     align-items: center;
// //     gap: 6px;
// //     background-color: #064e3b;
// //     border: none;
// //     border-radius: 4px;
// //     padding: 6px 12px;
// //     font-size: 14px;
// //     color: white;
// //     cursor: pointer;

// //     &:hover {
// //       background-color: #065f46;
// //     }

// //     svg {
// //       color: white;
// //     }
// //   }
// //   `,
// //   ],
// // })
// // export class OrderTableComponent implements OnInit, OnDestroy {
// //   // Update the orders array with the new data structure
// //   orders: Order[] = [
// //     {
// //       id: "MHGJ3-0",
// //       date: "23 Mar 2024",
// //       customerName: "John Doe",
// //       government: "Cairo",
// //       city: "Nasr City",
// //       orderCost: "$120.00",
// //       category: "Electronic",
// //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// //       arrivalDate: "5:00 pm",
// //       weight: "10 kg",
// //       lastLocation: "Warehouse A",
// //     },
// //     {
// //       id: "MHGJ3-2",
// //       date: "22 Mar 2024",
// //       customerName: "Jane Smith",
// //       government: "Alexandria",
// //       city: "Miami",
// //       orderCost: "$85.50",
// //       category: "Fashion",
// //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// //       arrivalDate: "5:00 pm",
// //       weight: "10 kg",
// //       lastLocation: "Warehouse A",
// //     },
// //     {
// //       id: "MHGJ3-3",
// //       date: "21 Mar 2024",
// //       customerName: "Robert Johnson",
// //       government: "Giza",
// //       city: "Dokki",
// //       orderCost: "$210.75",
// //       category: "Food",
// //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// //       arrivalDate: "5:00 pm",
// //       weight: "10 kg",
// //       lastLocation: "Warehouse A",
// //     },
// //     {
// //       id: "MHGJ3-4",
// //       date: "20 Mar 2024",
// //       customerName: "Emily Davis",
// //       government: "Cairo",
// //       city: "Maadi",
// //       orderCost: "$150.25",
// //       category: "Furniture",
// //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// //       arrivalDate: "5:00 pm",
// //       weight: "10 kg",
// //       lastLocation: "Warehouse A",
// //     },
// //     {
// //       id: "MHGJ3-5",
// //       date: "19 Mar 2024",
// //       customerName: "Michael Wilson",
// //       government: "Alexandria",
// //       city: "Montazah",
// //       orderCost: "$95.00",
// //       category: "Frozen Food",
// //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// //       arrivalDate: "5:00 pm",
// //       weight: "10 kg",
// //       lastLocation: "Warehouse B",
// //     },
// //     {
// //       id: "MHGJ3-6",
// //       date: "18 Mar 2024",
// //       customerName: "Sarah Brown",
// //       government: "Giza",
// //       city: "6th of October",
// //       orderCost: "$175.30",
// //       category: "Auto Parts",
// //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// //       arrivalDate: "5:00 pm",
// //       weight: "10 kg",
// //       lastLocation: "Warehouse C",
// //     },
// //     {
// //       id: "MHGJ3-7",
// //       date: "17 Mar 2024",
// //       customerName: "David Miller",
// //       government: "Luxor",
// //       city: "East Bank",
// //       orderCost: "$65.80",
// //       category: "Frozen Food",
// //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// //       arrivalDate: "5:00 pm",
// //       weight: "10 kg",
// //       lastLocation: "Warehouse B",
// //     },
// //     {
// //       id: "MHGJ3-8",
// //       date: "16 Mar 2024",
// //       customerName: "Lisa Taylor",
// //       government: "Aswan",
// //       city: "Aswan City",
// //       orderCost: "$130.45",
// //       category: "Chemicals",
// //       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
// //       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
// //       arrivalDate: "5:00 pm",
// //       weight: "10 kg",
// //       lastLocation: "Warehouse D",
// //     },
// //   ]

// //   filteredOrders: Order[] = []
// //   searchTerm = ""
// //   selectedDate = "23 March 2024"

// //   // For action menu
// //   activeActionMenu: string | null = null

// //   // For order details modal
// //   selectedOrderId: string | null = null
// //   isOrderDetailsVisible = false

// //   // For date picker
// //   showDatePicker = false

// //   // For filter menu
// //   showFilterMenu = false
// //   availableCategories: string[] = []
// //   availableLocations: string[] = []

// //   // Add a new property to the class
// //   showAddOrderModal = false

// //   // Update the filterOptions initialization
// //   filterOptions: FilterOptions = {
// //     categories: [],
// //     governments: [],
// //     cities: [],
// //     dateRange: {
// //       start: null,
// //       end: null,
// //     },
// //     locations: [],
// //   }

// //   // Add these properties to the class
// //   availableGovernments: string[] = []
// //   availableCities: string[] = []

// //   constructor(private orderService: OrderService) {}

// //   // Update the ngOnInit method to extract governments and cities
// //   ngOnInit(): void {
// //     this.filteredOrders = [...this.orders]

// //     // Extract unique categories, governments, cities, and locations for filters
// //     this.availableCategories = [...new Set(this.orders.map((order) => order.category || ""))]
// //     this.availableGovernments = [...new Set(this.orders.map((order) => order.government))]
// //     this.availableCities = [...new Set(this.orders.map((order) => order.city))]
// //     this.availableLocations = [...new Set(this.orders.map((order) => order.lastLocation || ""))]

// //     // Add global click handler to close menus
// //     document.addEventListener("click", this.handleDocumentClick.bind(this))
// //   }

// //   // Add this method to handle document clicks
// //   handleDocumentClick(event: MouseEvent): void {
// //     // Only process if any menu is open
// //     if (this.showDatePicker || this.showFilterMenu || this.activeActionMenu) {
// //       const target = event.target as HTMLElement

// //       // Don't close menus if clicking inside them
// //       if (
// //         target.closest(".date-picker") ||
// //         target.closest(".date-trigger") ||
// //         target.closest(".filter-menu") ||
// //         target.closest(".filter-btn") ||
// //         target.closest(".action-menu") ||
// //         target.closest(".action-btn")
// //       ) {
// //         return
// //       }

// //       // Close all menus
// //       this.showDatePicker = false
// //       this.showFilterMenu = false
// //       this.activeActionMenu = null
// //     }
// //   }

// //   // Update the filterOrders method to include government and city filters
// //   filterOrders(): void {
// //     // Start with all orders
// //     let filtered = [...this.orders]

// //     // Apply search term filter
// //     if (this.searchTerm.trim()) {
// //       const term = this.searchTerm.toLowerCase()
// //       filtered = filtered.filter(
// //         (order) =>
// //           order.id.toLowerCase().includes(term) ||
// //           order.customerName.toLowerCase().includes(term) ||
// //           order.government.toLowerCase().includes(term) ||
// //           order.city.toLowerCase().includes(term) ||
// //           (order.category && order.category.toLowerCase().includes(term)),
// //       )
// //     }

// //     // Apply category filters
// //     if (this.filterOptions.categories.length > 0) {
// //       filtered = filtered.filter((order) => order.category && this.filterOptions.categories.includes(order.category))
// //     }

// //     // Apply government filters
// //     if (this.filterOptions.governments.length > 0) {
// //       filtered = filtered.filter((order) => this.filterOptions.governments.includes(order.government))
// //     }

// //     // Apply city filters
// //     if (this.filterOptions.cities.length > 0) {
// //       filtered = filtered.filter((order) => this.filterOptions.cities.includes(order.city))
// //     }

// //     // Apply location filters
// //     if (this.filterOptions.locations.length > 0) {
// //       filtered = filtered.filter(
// //         (order) => order.lastLocation && this.filterOptions.locations.includes(order.lastLocation),
// //       )
// //     }

// //     // Apply date range filter (in a real app, you'd parse the dates properly)
// //     if (this.filterOptions.dateRange.start || this.filterOptions.dateRange.end) {
// //       // In a real app, you would convert the string dates to Date objects
// //       // and do proper date comparison
// //       console.log("Date filtering would be applied here")
// //     }

// //     this.filteredOrders = filtered
// //   }

// //   // Update the isFilterSelected method to include government and city
// //   isFilterSelected(filterType: "categories" | "governments" | "cities" | "locations", value: string): boolean {
// //     return this.filterOptions[filterType].includes(value)
// //   }

// //   // Update the toggleFilter method to include government and city
// //   toggleFilter(filterType: "categories" | "governments" | "cities" | "locations", value: string): void {
// //     const index = this.filterOptions[filterType].indexOf(value)
// //     if (index === -1) {
// //       this.filterOptions[filterType].push(value)
// //     } else {
// //       this.filterOptions[filterType].splice(index, 1)
// //     }
// //   }

// //   // Update the resetFilters method to include government and city
// //   resetFilters(): void {
// //     this.filterOptions = {
// //       categories: [],
// //       governments: [],
// //       cities: [],
// //       dateRange: {
// //         start: null,
// //         end: null,
// //       },
// //       locations: [],
// //     }
// //     this.selectedDate = "23 March 2024" // Reset to default date
// //     this.applyFilters()
// //   }

// //   // Update the createOrder method to match the new Order interface
// //   createOrder(orderData: any): void {
// //     console.log("New order data:", orderData)
// //     // In a real app, you would call a service to save the order
// //     // this.orderService.createOrder(orderData).subscribe(...)

// //     // For now, just add a mock order to the list
// //     const newOrder: Order = {
// //       id: `MHGJ3-${Math.floor(Math.random() * 100)}`,
// //       date: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
// //       customerName: orderData.customerName,
// //       government: orderData.government,
// //       city: orderData.city,
// //       orderCost: "$100.00", // Default value
// //       category: orderData.orderType,
// //       lastLocation: orderData.branch,
// //     }

// //     this.orders.unshift(newOrder)
// //     this.filterOrders()
// //   }

// //   // Action menu methods
// //   showActionMenu(event: MouseEvent, orderId: string): void {
// //     event.stopPropagation()

// //     // Close the menu if it's already open for this order
// //     if (this.activeActionMenu === orderId) {
// //       this.activeActionMenu = null
// //       return
// //     }

// //     // Set the active menu
// //     this.activeActionMenu = orderId

// //     // Close other menus
// //     this.showDatePicker = false
// //     this.showFilterMenu = false

// //     // Position the menu next to the clicked button
// //     setTimeout(() => {
// //       const button = event.currentTarget as HTMLElement
// //       const menu = document.querySelector(".action-menu") as HTMLElement

// //       if (button && menu) {
// //         const rect = button.getBoundingClientRect()
// //         menu.style.top = rect.bottom + "px"
// //         menu.style.left = rect.left - menu.offsetWidth + button.offsetWidth + "px"
// //       }
// //     })
// //   }

// //   viewOrderDetails(orderId: string): void {
// //     this.selectedOrderId = orderId
// //     this.isOrderDetailsVisible = true
// //     this.activeActionMenu = null
// //   }

// //   editOrder(orderId: string): void {
// //     console.log("Edit order:", orderId)
// //     this.activeActionMenu = null
// //     // In a real app, you would navigate to an edit page or open an edit modal
// //   }

// //   deleteOrder(orderId: string): void {
// //     if (confirm("Are you sure you want to delete this order?")) {
// //       this.orderService.deleteOrder(orderId).subscribe(
// //         () => {
// //           // Remove the order from the arrays
// //           this.orders = this.orders.filter((order) => order.id !== orderId)
// //           this.filterOrders() // Re-apply filters to update the view
// //         },
// //         (error) => {
// //           console.error("Error deleting order:", error)
// //         },
// //       )
// //     }
// //     this.activeActionMenu = null
// //   }

// //   closeOrderDetails(): void {
// //     this.isOrderDetailsVisible = false
// //     this.selectedOrderId = null
// //   }

// //   // Date picker methods
// //   toggleDatePicker(event: MouseEvent): void {
// //     event.stopPropagation()
// //     this.showDatePicker = !this.showDatePicker

// //     // Close other menus
// //     if (this.showDatePicker) {
// //       this.showFilterMenu = false
// //       this.activeActionMenu = null
// //     }
// //   }

// //   resetDateFilter(): void {
// //     this.filterOptions.dateRange = {
// //       start: null,
// //       end: null,
// //     }
// //   }

// //   applyDateFilter(): void {
// //     // Update the displayed date
// //     if (this.filterOptions.dateRange.start && this.filterOptions.dateRange.end) {
// //       this.selectedDate = `${this.filterOptions.dateRange.start} - ${this.filterOptions.dateRange.end}`
// //     } else if (this.filterOptions.dateRange.start) {
// //       this.selectedDate = `From ${this.filterOptions.dateRange.start}`
// //     } else if (this.filterOptions.dateRange.end) {
// //       this.selectedDate = `Until ${this.filterOptions.dateRange.end}`
// //     } else {
// //       this.selectedDate = "23 March 2024" // Default date
// //     }

// //     this.applyFilters()
// //     this.showDatePicker = false
// //   }

// //   // Filter menu methods
// //   toggleFilterMenu(event: MouseEvent): void {
// //     event.stopPropagation()
// //     this.showFilterMenu = !this.showFilterMenu

// //     // Close other menus
// //     if (this.showFilterMenu) {
// //       this.showDatePicker = false
// //       this.activeActionMenu = null
// //     }
// //   }

// //   applyFilters(): void {
// //     this.filterOrders()
// //     this.showFilterMenu = false
// //   }

// //   // Add a method to handle adding a new order
// //   addNewOrder(): void {
// //     this.showAddOrderModal = true
// //   }

// //   // Add ngOnDestroy to clean up event listeners
// //   ngOnDestroy(): void {
// //     document.removeEventListener("click", this.handleDocumentClick.bind(this))
// //   }
// // }
// import { Component,  OnInit,  OnDestroy } from "@angular/core"
// import { CommonModule } from "@angular/common"
// import { FormsModule } from "@angular/forms"
// import { OrderService } from "../../../services/order.service"
// import { OrderDetailsComponent } from "../order-details/order-details.component"
// import { AddOrderModalComponent } from "../add-order-modal/add-order-modal.component"

// // Update the Order interface to include the new fields
// interface Order {
//   id: string
//   date: string
//   customerName: string
//   government: string
//   city: string
//   orderCost: string
//   merchant: string
//   category?: string
//   origin?: string
//   destination?: string
//   arrivalDate?: string
//   weight?: string
//   lastLocation?: string
// }

// // Update the FilterOptions interface to include government and city
// interface FilterOptions {
//   categories: string[]
//   governments: string[]
//   cities: string[]
//   merchants: string[]
//   dateRange: {
//     start: string | null
//     end: string | null
//   }
//   locations: string[]
// }

// @Component({
//   selector: "app-order-table",
//   standalone: true,
//   imports: [CommonModule, FormsModule, OrderDetailsComponent, AddOrderModalComponent],
//   template: `
//   <div class="order-table-container">
//     <div class="table-header">
//       <h3>Detail Information</h3>

//       <div class="header-actions">
//         <button class="add-order-btn" (click)="addNewOrder()">
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//             <line x1="12" y1="5" x2="12" y2="19"></line>
//             <line x1="5" y1="12" x2="19" y2="12"></line>
//           </svg>
//           Add New Order
//         </button>

//         <div class="date-display">
//           <div class="date-trigger" (click)="toggleDatePicker($event)">
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//               <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//               <line x1="16" y1="2" x2="16" y2="6"></line>
//               <line x1="8" y1="2" x2="8" y2="6"></line>
//               <line x1="3" y1="10" x2="21" y2="10"></line>
//             </svg>
//             <span>{{ selectedDate }}</span>
//           </div>

//           <!-- Date Picker Dropdown -->
//           <div class="date-picker" *ngIf="showDatePicker" (click)="$event.stopPropagation()">
//             <div class="date-picker-header">
//               <h4>Select Date Range</h4>
//               <button class="close-btn" (click)="toggleDatePicker($event)">×</button>
//             </div>
//             <div class="date-picker-content">
//               <div class="date-input">
//                 <label>Start Date</label>
//                 <input type="date" [(ngModel)]="filterOptions.dateRange.start">
//               </div>
//               <div class="date-input">
//                 <label>End Date</label>
//                 <input type="date" [(ngModel)]="filterOptions.dateRange.end">
//               </div>
//               <div class="date-actions">
//                 <button class="reset-btn" (click)="resetDateFilter()">Reset</button>
//                 <button class="apply-btn" (click)="applyDateFilter()">Apply</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div class="filter-container">
//           <button class="filter-btn" (click)="toggleFilterMenu($event)">
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//               <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
//             </svg>
//             Filter
//           </button>

//           <!-- Filter Menu Dropdown -->
//           <div class="filter-menu" *ngIf="showFilterMenu" (click)="$event.stopPropagation()">
//             <div class="filter-menu-header">
//               <h4>Filter Options</h4>
//               <button class="close-btn" (click)="toggleFilterMenu($event)">×</button>
//             </div>
//             <div class="filter-menu-content">
//               <div class="filter-section">
//                 <h5>Government</h5>
//                 <div class="checkbox-list">
//                   <div class="checkbox-item" *ngFor="let government of availableGovernments">
//                     <input type="checkbox" [id]="'gov-' + government"
//                            [checked]="isFilterSelected('governments', government)"
//                            (change)="toggleFilter('governments', government)">
//                     <label [for]="'gov-' + government">{{ government }}</label>
//                   </div>
//                 </div>
//               </div>
//               <div class="filter-section">
//                 <h5>Merchant</h5>
//                 <div class="checkbox-list">
//                   <div class="checkbox-item" *ngFor="let merchant of availableMerchants">
//                     <input type="checkbox" [id]="'merchant-' + merchant"
//                            [checked]="isFilterSelected('merchants', merchant)"
//                            (change)="toggleFilter('merchants', merchant)">
//                     <label [for]="'merchant-' + merchant">{{ merchant }}</label>
//                   </div>
//                 </div>
//               </div>
//               <div class="filter-section">
//                 <h5>City</h5>
//                 <div class="checkbox-list">
//                   <div class="checkbox-item" *ngFor="let city of availableCities">
//                     <input type="checkbox" [id]="'city-' + city"
//                            [checked]="isFilterSelected('cities', city)"
//                            (change)="toggleFilter('cities', city)">
//                     <label [for]="'city-' + city">{{ city }}</label>
//                   </div>
//                 </div>
//               </div>
//               <div class="filter-section">
//                 <h5>Categories</h5>
//                 <div class="checkbox-list">
//                   <div class="checkbox-item" *ngFor="let category of availableCategories">
//                     <input type="checkbox" [id]="'cat-' + category"
//                            [checked]="isFilterSelected('categories', category)"
//                            (change)="toggleFilter('categories', category)">
//                     <label [for]="'cat-' + category">{{ category }}</label>
//                   </div>
//                 </div>
//               </div>
//               <div class="filter-actions">
//                 <button class="reset-btn" (click)="resetFilters()">Reset All</button>
//                 <button class="apply-btn" (click)="applyFilters()">Apply Filters</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div class="search-box">
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//             <circle cx="11" cy="11" r="8"></circle>
//             <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//           </svg>
//           <input type="text" placeholder="Search" [(ngModel)]="searchTerm" (input)="filterOrders()">
//         </div>
//       </div>
//     </div>

//     <div class="table-wrapper">
//       <table class="order-table">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Date</th>
//             <th>Customer Name</th>
//             <th>Merchant</th>
//             <th>Government</th>
//             <th>City</th>
//             <th>Order Cost</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr *ngFor="let order of filteredOrders">
//             <td>{{ order.id }}</td>
//             <td>{{ order.date }}</td>
//             <td>{{ order.customerName }}</td>
//             <td>{{ order.merchant }}</td>
//             <td>{{ order.government }}</td>
//             <td>{{ order.city }}</td>
//             <td>{{ order.orderCost }}</td>
//             <td class="action-cell">
//               <button class="action-btn" (click)="showActionMenu($event, order.id)">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                   <circle cx="12" cy="12" r="1"></circle>
//                   <circle cx="19" cy="12" r="1"></circle>
//                   <circle cx="5" cy="12" r="1"></circle>
//                 </svg>
//               </button>
//             </td>
//           </tr>
//           <tr *ngIf="filteredOrders.length === 0">
//             <td colspan="7" class="empty-message">No orders found matching your criteria</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </div>

//   <!-- Add Order Modal -->
//   <app-add-order-modal
//     [isVisible]="showAddOrderModal"
//     (close)="showAddOrderModal = false"
//     (create)="createOrder($event)">
//   </app-add-order-modal>

//   <!-- Action Menu (moved outside to prevent multiple menus) -->
//   <div class="action-menu" *ngIf="activeActionMenu" (click)="$event.stopPropagation()">
//     <button class="menu-item" (click)="viewOrderDetails(activeActionMenu)">
//       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//         <circle cx="12" cy="12" r="3"></circle>
//       </svg>
//       View
//     </button>
//     <button class="menu-item" (click)="editOrder(activeActionMenu)">
//       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//         <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//         <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
//       </svg>
//       Edit
//     </button>
//     <button class="menu-item delete" (click)="deleteOrder(activeActionMenu)">
//       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//         <polyline points="3 6 5 6 21 6"></polyline>
//         <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//       </svg>
//       Delete
//     </button>
//   </div>

//   <!-- Order Details Modal -->
//   <app-order-details
//     *ngIf="selectedOrderId"
//     [orderId]="selectedOrderId"
//     [isVisible]="isOrderDetailsVisible"
//     (close)="closeOrderDetails()">
//   </app-order-details>
// `,
//   styles: [
//     `
//   .order-table-container {
//     width: 100%;
//     position: relative;
//   }

//   .table-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 16px;
//     border-bottom: 1px solid #e2e8f0;

//     h3 {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1e293b;
//       margin: 0;
//     }
//   }

//   .header-actions {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }

//   .date-display {
//     position: relative;

//     .date-trigger {
//       display: flex;
//       align-items: center;
//       gap: 6px;
//       font-size: 14px;
//       color: #64748b;
//       cursor: pointer;
//       padding: 6px 12px;
//       border-radius: 4px;
//       background-color: #f1f5f9;

//       svg {
//         color: #64748b;
//       }

//       &:hover {
//         background-color: #e2e8f0;
//       }
//     }
//   }

//   .date-picker {
//     position: absolute;
//     top: 100%;
//     left: 0;
//     width: 280px;
//     background-color: white;
//     border-radius: 4px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//     z-index: 100;
//     margin-top: 8px;
//   }

//   .date-picker-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 12px 16px;
//     border-bottom: 1px solid #e2e8f0;

//     h4 {
//       font-size: 14px;
//       font-weight: 600;
//       color: #1e293b;
//       margin: 0;
//     }

//     .close-btn {
//       background: none;
//       border: none;
//       font-size: 18px;
//       color: #64748b;
//       cursor: pointer;

//       &:hover {
//         color: #1e293b;
//       }
//     }
//   }

//   .date-picker-content {
//     padding: 16px;
//   }

//   .date-input {
//     margin-bottom: 12px;

//     label {
//       display: block;
//       font-size: 12px;
//       color: #64748b;
//       margin-bottom: 4px;
//     }

//     input {
//       width: 100%;
//       padding: 8px;
//       border: 1px solid #e2e8f0;
//       border-radius: 4px;
//       font-size: 14px;
//       color: #1e293b;

//       &:focus {
//         outline: none;
//         border-color: #064e3b;
//       }
//     }
//   }

//   .date-actions {
//     display: flex;
//     justify-content: flex-end;
//     gap: 8px;
//     margin-top: 16px;
//   }

//   .filter-container {
//     position: relative;
//   }

//   .filter-btn {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     background-color: #f1f5f9;
//     border: none;
//     border-radius: 4px;
//     padding: 6px 12px;
//     font-size: 14px;
//     color: #1e293b;
//     cursor: pointer;

//     &:hover {
//       background-color: #e2e8f0;
//     }
//   }

//   .filter-menu {
//     position: absolute;
//     top: 100%;
//     right: 0;
//     width: 280px;
//     background-color: white;
//     border-radius: 4px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//     z-index: 1000;
//     margin-top: 8px;
//     max-height: 80vh;
//     overflow-y: auto;
//   }

//   .filter-menu-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 12px 16px;
//     border-bottom: 1px solid #e2e8f0;

//     h4 {
//       font-size: 14px;
//       font-weight: 600;
//       color: #1e293b;
//       margin: 0;
//     }

//     .close-btn {
//       background: none;
//       border: none;
//       font-size: 18px;
//       color: #64748b;
//       cursor: pointer;

//       &:hover {
//         color: #1e293b;
//       }
//     }
//   }

//   .filter-menu-content {
//     padding: 16px;
//   }

//   .filter-section {
//     margin-bottom: 16px;

//     h5 {
//       font-size: 14px;
//       font-weight: 500;
//       color: #1e293b;
//       margin: 0 0 8px 0;
//     }
//   }

//   .checkbox-list {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//   }

//   .checkbox-item {
//     display: flex;
//     align-items: center;
//     gap: 8px;

//     label {
//       font-size: 14px;
//       color: #1e293b;
//       cursor: pointer;
//     }
//   }

//   .filter-actions {
//     display: flex;
//     justify-content: flex-end;
//     gap: 8px;
//     margin-top: 16px;
//     position: sticky;
//     bottom: 0;
//     padding: 8px 0;
//     background-color: white;
//     border-top: 1px solid #e2e8f0;
//   }

//   .reset-btn {
//     background-color: white;
//     border: 1px solid #e2e8f0;
//     border-radius: 4px;
//     padding: 6px 12px;
//     font-size: 14px;
//     color: #64748b;
//     cursor: pointer;

//     &:hover {
//       background-color: #f1f5f9;
//     }
//   }

//   .apply-btn {
//     background-color: #064e3b;
//     border: none;
//     border-radius: 4px;
//     padding: 6px 12px;
//     font-size: 14px;
//     color: white;
//     cursor: pointer;

//     &:hover {
//       background-color: #065f46;
//     }
//   }

//   .search-box {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     background-color: #f1f5f9;
//     border-radius: 4px;
//     padding: 6px 12px;
//     width: 180px;

//     svg {
//       color: #64748b;
//     }

//     input {
//       border: none;
//       background: none;
//       outline: none;
//       font-size: 14px;
//       color: #1e293b;
//       width: 100%;

//       &::placeholder {
//         color: #64748b;
//       }
//     }
//   }

//   .table-wrapper {
//     overflow-x: auto;
//   }

//   .order-table {
//     width: 100%;
//     border-collapse: collapse;

//     th, td {
//       padding: 12px 16px;
//       text-align: left;
//       font-size: 14px;
//     }

//     th {
//       color: #64748b;
//       font-weight: 500;
//       background-color: #f8fafc;
//     }

//     td {
//       color: #1e293b;
//       border-bottom: 1px solid #f1f5f9;
//     }
//   }

//   .action-cell {
//     position: relative;
//   }

//   .action-btn {
//     background: none;
//     border: none;
//     cursor: pointer;
//     color: #64748b;

//     &:hover {
//       color: #1e293b;
//     }
//   }

//   .action-menu {
//     position: absolute;
//     width: 120px;
//     background-color: white;
//     border-radius: 4px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//     z-index: 1000;
//     overflow: hidden;
//   }

//   .menu-item {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     width: 100%;
//     padding: 8px 12px;
//     border: none;
//     background: none;
//     text-align: left;
//     font-size: 14px;
//     color: #1e293b;
//     cursor: pointer;

//     &:hover {
//       background-color: #f1f5f9;
//     }

//     &.delete {
//       color: #ef4444;

//       &:hover {
//         background-color: #fee2e2;
//       }
//     }
//   }

//   .empty-message {
//     text-align: center;
//     padding: 24px;
//     color: #64748b;
//   }

//   .add-new-order-btn {
//     background-color: #064e3b;
//     border: none;
//     border-radius: 4px;
//     padding: 6px 12px;
//     font-size: 14px;
//     color: white;
//     cursor: pointer;

//     &:hover {
//       background-color: #065f46;
//     }
//   }

//   .add-order-btn {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     background-color: #064e3b;
//     border: none;
//     border-radius: 4px;
//     padding: 6px 12px;
//     font-size: 14px;
//     color: white;
//     cursor: pointer;

//     &:hover {
//       background-color: #065f46;
//     }

//     svg {
//       color: white;
//     }
//   }
//   `,
//   ],
// })
// export class OrderTableComponent implements OnInit, OnDestroy {
//   // Update the orders array with the new data structure
//   orders: Order[] = [
//     {
//       id: "MHGJ3-0",
//       date: "23 Mar 2024",
//       customerName: "John Doe",
//       government: "Cairo",
//       city: "Nasr City",
//       orderCost: "$120.00",
//       merchant: "Electronics Store",
//       category: "Electronic",
//       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
//       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
//       arrivalDate: "5:00 pm",
//       weight: "10 kg",
//       lastLocation: "Warehouse A",
//     },
//     {
//       id: "MHGJ3-2",
//       date: "22 Mar 2024",
//       customerName: "Jane Smith",
//       government: "Alexandria",
//       city: "Miami",
//       orderCost: "$85.50",
//       merchant: "Fashion Outlet",
//       category: "Fashion",
//       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
//       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
//       arrivalDate: "5:00 pm",
//       weight: "10 kg",
//       lastLocation: "Warehouse A",
//     },
//     {
//       id: "MHGJ3-3",
//       date: "21 Mar 2024",
//       customerName: "Robert Johnson",
//       government: "Giza",
//       city: "Dokki",
//       orderCost: "$210.75",
//       merchant: "Grocery Market",
//       category: "Food",
//       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
//       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
//       arrivalDate: "5:00 pm",
//       weight: "10 kg",
//       lastLocation: "Warehouse A",
//     },
//     {
//       id: "MHGJ3-4",
//       date: "20 Mar 2024",
//       customerName: "Emily Davis",
//       government: "Cairo",
//       city: "Maadi",
//       orderCost: "$150.25",
//       merchant: "Home Depot",
//       category: "Furniture",
//       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
//       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
//       arrivalDate: "5:00 pm",
//       weight: "10 kg",
//       lastLocation: "Warehouse A",
//     },
//     {
//       id: "MHGJ3-5",
//       date: "19 Mar 2024",
//       customerName: "Michael Wilson",
//       government: "Alexandria",
//       city: "Montazah",
//       orderCost: "$95.00",
//       merchant: "Grocery Market",
//       category: "Frozen Food",
//       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
//       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
//       arrivalDate: "5:00 pm",
//       weight: "10 kg",
//       lastLocation: "Warehouse B",
//     },
//     {
//       id: "MHGJ3-6",
//       date: "18 Mar 2024",
//       customerName: "Sarah Brown",
//       government: "Giza",
//       city: "6th of October",
//       orderCost: "$175.30",
//       merchant: "Auto Parts Store",
//       category: "Auto Parts",
//       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
//       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
//       arrivalDate: "5:00 pm",
//       weight: "10 kg",
//       lastLocation: "Warehouse C",
//     },
//     {
//       id: "MHGJ3-7",
//       date: "17 Mar 2024",
//       customerName: "David Miller",
//       government: "Luxor",
//       city: "East Bank",
//       orderCost: "$65.80",
//       merchant: "Grocery Market",
//       category: "Frozen Food",
//       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
//       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
//       arrivalDate: "5:00 pm",
//       weight: "10 kg",
//       lastLocation: "Warehouse B",
//     },
//     {
//       id: "MHGJ3-8",
//       date: "16 Mar 2024",
//       customerName: "Lisa Taylor",
//       government: "Aswan",
//       city: "Aswan City",
//       orderCost: "$130.45",
//       merchant: "Chemical Supply Co",
//       category: "Chemicals",
//       origin: "2775 Ash Dr, San Jose, South Dakota 83475",
//       destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
//       arrivalDate: "5:00 pm",
//       weight: "10 kg",
//       lastLocation: "Warehouse D",
//     },
//   ]

//   filteredOrders: Order[] = []
//   searchTerm = ""
//   selectedDate = "23 March 2024"

//   // For action menu
//   activeActionMenu: string | null = null

//   // For order details modal
//   selectedOrderId: string | null = null
//   isOrderDetailsVisible = false

//   // For date picker
//   showDatePicker = false

//   // For filter menu
//   showFilterMenu = false
//   availableCategories: string[] = []
//   availableLocations: string[] = []

//   // Add a new property to the class
//   showAddOrderModal = false

//   // Update the filterOptions initialization
//   filterOptions: FilterOptions = {
//     categories: [],
//     governments: [],
//     cities: [],
//     merchants: [],
//     dateRange: {
//       start: null,
//       end: null,
//     },
//     locations: [],
//   }

//   // Add these properties to the class
//   availableGovernments: string[] = []
//   availableCities: string[] = []
//   availableMerchants: string[] = []

//   constructor(private orderService: OrderService) {}

//   // Update the ngOnInit method to extract governments and cities
//   ngOnInit(): void {
//     this.filteredOrders = [...this.orders]

//     // Extract unique categories, governments, cities, and locations for filters
//     this.availableCategories = [...new Set(this.orders.map((order) => order.category || ""))]
//     this.availableGovernments = [...new Set(this.orders.map((order) => order.government))]
//     this.availableCities = [...new Set(this.orders.map((order) => order.city))]
//     this.availableMerchants = [...new Set(this.orders.map((order) => order.merchant))]
//     this.availableLocations = [...new Set(this.orders.map((order) => order.lastLocation || ""))]

//     // Add global click handler to close menus
//     document.addEventListener("click", this.handleDocumentClick.bind(this))
//   }

//   // Add this method to handle document clicks
//   handleDocumentClick(event: MouseEvent): void {
//     // Only process if any menu is open
//     if (this.showDatePicker || this.showFilterMenu || this.activeActionMenu) {
//       const target = event.target as HTMLElement

//       // Don't close menus if clicking inside them
//       if (
//         target.closest(".date-picker") ||
//         target.closest(".date-trigger") ||
//         target.closest(".filter-menu") ||
//         target.closest(".filter-btn") ||
//         target.closest(".action-menu") ||
//         target.closest(".action-btn")
//       ) {
//         return
//       }

//       // Close all menus
//       this.showDatePicker = false
//       this.showFilterMenu = false
//       this.activeActionMenu = null
//     }
//   }

//   // Update the filterOrders method to include government and city filters
//   filterOrders(): void {
//     // Start with all orders
//     let filtered = [...this.orders]

//     // Apply search term filter
//     if (this.searchTerm.trim()) {
//       const term = this.searchTerm.toLowerCase()
//       filtered = filtered.filter(
//         (order) =>
//           order.id.toLowerCase().includes(term) ||
//           order.customerName.toLowerCase().includes(term) ||
//           order.government.toLowerCase().includes(term) ||
//           order.city.toLowerCase().includes(term) ||
//           (order.category && order.category.toLowerCase().includes(term)),
//       )
//     }

//     // Apply category filters
//     if (this.filterOptions.categories.length > 0) {
//       filtered = filtered.filter((order) => order.category && this.filterOptions.categories.includes(order.category))
//     }

//     // Apply government filters
//     if (this.filterOptions.governments.length > 0) {
//       filtered = filtered.filter((order) => this.filterOptions.governments.includes(order.government))
//     }

//     // Apply city filters
//     if (this.filterOptions.cities.length > 0) {
//       filtered = filtered.filter((order) => this.filterOptions.cities.includes(order.city))
//     }

//     // Apply merchant filters
//     if (this.filterOptions.merchants.length > 0) {
//       filtered = filtered.filter((order) => this.filterOptions.merchants.includes(order.merchant))
//     }

//     // Apply location filters
//     if (this.filterOptions.locations.length > 0) {
//       filtered = filtered.filter(
//         (order) => order.lastLocation && this.filterOptions.locations.includes(order.lastLocation),
//       )
//     }

//     // Apply date range filter (in a real app, you'd parse the dates properly)
//     if (this.filterOptions.dateRange.start || this.filterOptions.dateRange.end) {
//       // In a real app, you would convert the string dates to Date objects
//       // and do proper date comparison
//       console.log("Date filtering would be applied here")
//     }

//     this.filteredOrders = filtered
//   }

//   // Update the isFilterSelected method to include government and city
//   isFilterSelected(
//     filterType: "categories" | "governments" | "cities" | "merchants" | "locations",
//     value: string,
//   ): boolean {
//     return this.filterOptions[filterType].includes(value)
//   }

//   // Update the toggleFilter method to include government and city
//   toggleFilter(filterType: "categories" | "governments" | "cities" | "merchants" | "locations", value: string): void {
//     const index = this.filterOptions[filterType].indexOf(value)
//     if (index === -1) {
//       this.filterOptions[filterType].push(value)
//     } else {
//       this.filterOptions[filterType].splice(index, 1)
//     }
//   }

//   // Update the resetFilters method to include government and city
//   resetFilters(): void {
//     this.filterOptions = {
//       categories: [],
//       governments: [],
//       cities: [],
//       merchants: [],
//       dateRange: {
//         start: null,
//         end: null,
//       },
//       locations: [],
//     }
//     this.selectedDate = "23 March 2024" // Reset to default date
//     this.applyFilters()
//   }

//   // Update the createOrder method to match the new Order interface
//   createOrder(orderData: any): void {
//     console.log("New order data:", orderData)
//     // In a real app, you would call a service to save the order
//     // this.orderService.createOrder(orderData).subscribe(...)

//     // For now, just add a mock order to the list
//     const newOrder: Order = {
//       id: `MHGJ3-${Math.floor(Math.random() * 100)}`,
//       date: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
//       customerName: orderData.customerName,
//       government: orderData.government,
//       city: orderData.city,
//       merchant: orderData.merchantName,
//       orderCost: "$100.00", // Default value
//       category: orderData.orderType,
//       lastLocation: orderData.branch,
//     }

//     this.orders.unshift(newOrder)
//     this.filterOrders()
//   }

//   // Action menu methods
//   showActionMenu(event: MouseEvent, orderId: string): void {
//     event.stopPropagation()

//     // Toggle the menu
//     if (this.activeActionMenu === orderId) {
//       this.activeActionMenu = null
//       return
//     }

//     this.activeActionMenu = orderId

//     // Close other menus
//     this.showDatePicker = false
//     this.showFilterMenu = false

//     // Position the menu next to the clicked button
//     setTimeout(() => {
//       const button = event.currentTarget as HTMLElement
//       const menu = document.querySelector(".action-menu") as HTMLElement

//       if (button && menu) {
//         const rect = button.getBoundingClientRect()

//         // Position the menu below the button
//         menu.style.position = "absolute"
//         menu.style.top = `${window.scrollY + rect.bottom + 5}px`
//         menu.style.left = `${rect.left - 80}px` // Offset to align better

//         // Make sure menu doesn't go off-screen
//         const rightEdge = rect.left + menu.offsetWidth
//         if (rightEdge > window.innerWidth) {
//           menu.style.left = `${window.innerWidth - menu.offsetWidth - 10}px`
//         }
//       }
//     })
//   }

//   viewOrderDetails(orderId: string): void {
//     this.selectedOrderId = orderId
//     this.isOrderDetailsVisible = true
//     this.activeActionMenu = null
//   }

//   editOrder(orderId: string): void {
//     console.log("Edit order:", orderId)
//     this.activeActionMenu = null
//     // In a real app, you would navigate to an edit page or open an edit modal
//   }

//   deleteOrder(orderId: string): void {
//     if (confirm("Are you sure you want to delete this order?")) {
//       this.orderService.deleteOrder(orderId).subscribe(
//         () => {
//           // Remove the order from the arrays
//           this.orders = this.orders.filter((order) => order.id !== orderId)
//           this.filterOrders() // Re-apply filters to update the view
//         },
//         (error) => {
//           console.error("Error deleting order:", error)
//         },
//       )
//     }
//     this.activeActionMenu = null
//   }

//   closeOrderDetails(): void {
//     this.isOrderDetailsVisible = false
//     this.selectedOrderId = null
//   }

//   // Date picker methods
//   toggleDatePicker(event: MouseEvent): void {
//     event.stopPropagation()
//     this.showDatePicker = !this.showDatePicker

//     // Close other menus
//     if (this.showDatePicker) {
//       this.showFilterMenu = false
//       this.activeActionMenu = null
//     }
//   }

//   resetDateFilter(): void {
//     this.filterOptions.dateRange = {
//       start: null,
//       end: null,
//     }
//   }

//   applyDateFilter(): void {
//     // Update the displayed date
//     if (this.filterOptions.dateRange.start && this.filterOptions.dateRange.end) {
//       this.selectedDate = `${this.filterOptions.dateRange.start} - ${this.filterOptions.dateRange.end}`
//     } else if (this.filterOptions.dateRange.start) {
//       this.selectedDate = `From ${this.filterOptions.dateRange.start}`
//     } else if (this.filterOptions.dateRange.end) {
//       this.selectedDate = `Until ${this.filterOptions.dateRange.end}`
//     } else {
//       this.selectedDate = "23 March 2024" // Default date
//     }

//     this.applyFilters()
//     this.showDatePicker = false
//   }

//   // Filter menu methods
//   toggleFilterMenu(event: MouseEvent): void {
//     event.stopPropagation()
//     this.showFilterMenu = !this.showFilterMenu

//     // Close other menus
//     if (this.showFilterMenu) {
//       this.showDatePicker = false
//       this.activeActionMenu = null
//     }
//   }

//   applyFilters(): void {
//     this.filterOrders()
//     this.showFilterMenu = false
//   }

//   // Add a method to handle adding a new order
//   addNewOrder(): void {
//     this.showAddOrderModal = true
//   }

//   // Add ngOnDestroy to clean up event listeners
//   ngOnDestroy(): void {
//     document.removeEventListener("click", this.handleDocumentClick.bind(this))
//   }
// }

import { Component,  OnInit, OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import  { OrderService } from "../../../services/order.service"
import { OrderDetailsComponent } from "../order-details/order-details.component"

interface Order {
  id: string
  category: string
  origin: string
  destination: string
  arrivalDate: string
  weight: string
  lastLocation: string
}

interface FilterOptions {
  categories: string[]
  dateRange: {
    start: string | null
    end: string | null
  }
  locations: string[]
}

@Component({
  selector: "app-order-table",
  standalone: true,
  imports: [CommonModule, FormsModule, OrderDetailsComponent],
  template: `
  <div class="order-table-container">
    <div class="table-header">
      <h3>Detail Information</h3>

      <div class="header-actions">
        <div class="date-display">
          <div class="date-trigger" (click)="toggleDatePicker($event)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{{ selectedDate }}</span>
          </div>

          <!-- Date Picker Dropdown -->
          <div class="date-picker" *ngIf="showDatePicker" (click)="$event.stopPropagation()">
            <div class="date-picker-header">
              <h4>Select Date Range</h4>
              <button class="close-btn" (click)="toggleDatePicker($event)">×</button>
            </div>
            <div class="date-picker-content">
              <div class="date-input">
                <label>Start Date</label>
                <input type="date" [(ngModel)]="filterOptions.dateRange.start">
              </div>
              <div class="date-input">
                <label>End Date</label>
                <input type="date" [(ngModel)]="filterOptions.dateRange.end">
              </div>
              <div class="date-actions">
                <button class="reset-btn" (click)="resetDateFilter()">Reset</button>
                <button class="apply-btn" (click)="applyDateFilter()">Apply</button>
              </div>
            </div>
          </div>
        </div>

        <div class="filter-container">
          <button class="filter-btn" (click)="toggleFilterMenu($event)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filter
          </button>
        </div>

        <!-- Filter Menu Dropdown (moved outside to prevent nesting issues) -->
        <div class="filter-menu" *ngIf="showFilterMenu" (click)="$event.stopPropagation()">
          <div class="filter-menu-header">
            <h4>Filter Options</h4>
            <button class="close-btn" (click)="toggleFilterMenu($event)">×</button>
          </div>
          <div class="filter-menu-content">
            <div class="filter-section">
              <h5>Categories</h5>
              <div class="checkbox-list">
                <div class="checkbox-item" *ngFor="let category of availableCategories">
                  <input type="checkbox" [id]="'cat-' + category"
                         [checked]="isFilterSelected('categories', category)"
                         (change)="toggleFilter('categories', category)">
                  <label [for]="'cat-' + category">{{ category }}</label>
                </div>
              </div>
            </div>
            <div class="filter-section">
              <h5>Locations</h5>
              <div class="checkbox-list">
                <div class="checkbox-item" *ngFor="let location of availableLocations">
                  <input type="checkbox" [id]="'loc-' + location"
                         [checked]="isFilterSelected('locations', location)"
                         (change)="toggleFilter('locations', location)">
                  <label [for]="'loc-' + location">{{ location }}</label>
                </div>
              </div>
            </div>
            <div class="filter-actions">
              <button class="reset-btn" (click)="resetFilters()">Reset All</button>
              <button class="apply-btn" (click)="applyFilters()">Apply Filters</button>
            </div>
          </div>
        </div>

        <div class="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Search" [(ngModel)]="searchTerm" (input)="filterOrders()">
        </div>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Category</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Arrival Date</th>
            <th>Weight</th>
            <th>Last location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of filteredOrders">
            <td>{{ order.id }}</td>
            <td>{{ order.category }}</td>
            <td>{{ order.origin }}</td>
            <td>{{ order.destination }}</td>
            <td>{{ order.arrivalDate }}</td>
            <td>{{ order.weight }}</td>
            <td>{{ order.lastLocation }}</td>
            <td class="action-cell">
              <button class="action-btn" (click)="showActionMenu($event, order.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </td>
          </tr>
          <tr *ngIf="filteredOrders.length === 0">
            <td colspan="8" class="empty-message">No orders found matching your criteria</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Action Menu (moved outside to prevent multiple menus) -->
  <div class="action-menu" *ngIf="activeActionMenu" (click)="$event.stopPropagation()">
    <button class="menu-item" (click)="viewOrderDetails(activeActionMenu)">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      View
    </button>
    <button class="menu-item" (click)="editOrder(activeActionMenu)">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
      Edit
    </button>
    <button class="menu-item delete" (click)="deleteOrder(activeActionMenu)">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
      Delete
    </button>
  </div>

  <!-- Order Details Modal -->
  <app-order-details
    *ngIf="selectedOrderId"
    [orderId]="selectedOrderId"
    [isVisible]="isOrderDetailsVisible"
    (close)="closeOrderDetails()">
  </app-order-details>
`,
  styles: [
    `
  .order-table-container {
    width: 100%;
    position: relative;
  }

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #e2e8f0;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .date-display {
    position: relative;

    .date-trigger {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      color: #64748b;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: 4px;
      background-color: #f1f5f9;

      svg {
        color: #64748b;
      }

      &:hover {
        background-color: #e2e8f0;
      }
    }
  }

  .date-picker {
    position: absolute;
    top: 100%;
    left: 0;
    width: 280px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
    margin-top: 8px;
  }

  .date-picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #e2e8f0;

    h4 {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 18px;
      color: #64748b;
      cursor: pointer;

      &:hover {
        color: #1e293b;
      }
    }
  }

  .date-picker-content {
    padding: 16px;
  }

  .date-input {
    margin-bottom: 12px;

    label {
      display: block;
      font-size: 12px;
      color: #64748b;
      margin-bottom: 4px;
    }

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      font-size: 14px;
      color: #1e293b;

      &:focus {
        outline: none;
        border-color: #064e3b;
      }
    }
  }

  .date-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
  }

  .filter-container {
    position: relative;
  }

  .filter-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: #f1f5f9;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 14px;
    color: #1e293b;
    cursor: pointer;

    &:hover {
      background-color: #e2e8f0;
    }
  }

  .filter-menu {
    position: absolute;
    top: 100%;
    right: 0;
    width: 280px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    margin-top: 8px;
    overflow-y: auto;
  }

  .filter-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 12px 16px; */
    border-bottom: 1px solid #e2e8f0;

    h4 {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 18px;
      color: #64748b;
      cursor: pointer;

      &:hover {
        color: #1e293b;
      }
    }
  }

  .filter-menu-content {
    padding: 16px;
  }

  .filter-section {
    margin-bottom: 16px;

    h5 {
      font-size: 14px;
      font-weight: 500;
      color: #1e293b;
      margin: 0 0 8px 0;
    }
  }

  .checkbox-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 8px;

    label {
      font-size: 14px;
      color: #1e293b;
      cursor: pointer;
    }
  }

  .filter-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
    position: sticky;
    bottom: 0;
    padding: 8px 0;
    background-color: white;
    border-top: 1px solid #e2e8f0;
  }

  .reset-btn {
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 14px;
    color: #64748b;
    cursor: pointer;

    &:hover {
      background-color: #f1f5f9;
    }
  }

  .apply-btn {
    background-color: #064e3b;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 14px;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #065f46;
    }
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: #f1f5f9;
    border-radius: 4px;
    padding: 6px 12px;
    width: 180px;

    svg {
      color: #64748b;
    }

    input {
      border: none;
      background: none;
      outline: none;
      font-size: 14px;
      color: #1e293b;
      width: 100%;

      &::placeholder {
        color: #64748b;
      }
    }
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .order-table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 12px 16px;
      text-align: left;
      font-size: 14px;
    }

    th {
      color: #64748b;
      font-weight: 500;
      background-color: #f8fafc;
    }

    td {
      color: #1e293b;
      border-bottom: 1px solid #f1f5f9;
    }
  }

  .action-cell {
    position: relative;
  }

  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #64748b;

    &:hover {
      color: #1e293b;
    }
  }

  .action-menu {
    position: fixed;
    width: 120px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    overflow: hidden;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    border: none;
    background: none;
    text-align: left;
    font-size: 14px;
    color: #1e293b;
    cursor: pointer;

    &:hover {
      background-color: #f1f5f9;
    }

    &.delete {
      color: #ef4444;

      &:hover {
        background-color: #fee2e2;
      }
    }
  }

  .empty-message {
    text-align: center;
    padding: 24px;
    color: #64748b;
  }
  `,
  ],
})
export class OrderTableComponent implements OnInit, OnDestroy {
  orders: Order[] = [
    {
      id: "MHGJ3-0",
      category: "Electronic",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse A",
    },
    {
      id: "MHGJ3-2",
      category: "Fashion",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse A",
    },
    {
      id: "MHGJ3-0",
      category: "Food",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse A",
    },
    {
      id: "MHGJ3-2",
      category: "Furniture",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse A",
    },
    {
      id: "MHGJ3-2",
      category: "Frozen Food",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse B",
    },
    {
      id: "MHGJ3-2",
      category: "Auto Parts",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse C",
    },
    {
      id: "MHGJ3-2",
      category: "Frozen Food",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse B",
    },
    {
      id: "MHGJ3-2",
      category: "Chemicals",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse D",
    },
  ]

  filteredOrders: Order[] = []
  searchTerm = ""
  selectedDate = "23 March 2024"

  // For action menu
  activeActionMenu: string | null = null

  // For order details modal
  selectedOrderId: string | null = null
  isOrderDetailsVisible = false

  // For date picker
  showDatePicker = false

  // For filter menu
  showFilterMenu = false
  availableCategories: string[] = []
  availableLocations: string[] = []

  filterOptions: FilterOptions = {
    categories: [],
    dateRange: {
      start: null,
      end: null,
    },
    locations: [],
  }

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.filteredOrders = [...this.orders]

    // Extract unique categories and locations for filters
    this.availableCategories = [...new Set(this.orders.map((order) => order.category))]
    this.availableLocations = [...new Set(this.orders.map((order) => order.lastLocation))]

    // Add global click handler to close menus
    document.addEventListener("click", this.handleDocumentClick.bind(this))
  }

  // Add this method to handle document clicks
  handleDocumentClick(event: MouseEvent): void {
    // Only process if any menu is open
    if (this.showDatePicker || this.showFilterMenu || this.activeActionMenu) {
      const target = event.target as HTMLElement

      // Don't close menus if clicking inside them
      if (
        target.closest(".date-picker") ||
        target.closest(".date-trigger") ||
        target.closest(".filter-menu") ||
        target.closest(".filter-btn") ||
        target.closest(".action-menu") ||
        target.closest(".action-btn")
      ) {
        return
      }

      // Close all menus
      this.showDatePicker = false
      this.showFilterMenu = false
      this.activeActionMenu = null
    }
  }

  filterOrders(): void {
    // Start with all orders
    let filtered = [...this.orders]

    // Apply search term filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(term) ||
          order.category.toLowerCase().includes(term) ||
          order.origin.toLowerCase().includes(term) ||
          order.destination.toLowerCase().includes(term) ||
          order.lastLocation.toLowerCase().includes(term),
      )
    }

    // Apply category filters
    if (this.filterOptions.categories.length > 0) {
      filtered = filtered.filter((order) => this.filterOptions.categories.includes(order.category))
    }

    // Apply location filters
    if (this.filterOptions.locations.length > 0) {
      filtered = filtered.filter((order) => this.filterOptions.locations.includes(order.lastLocation))
    }

    // Apply date range filter (in a real app, you'd parse the dates properly)
    // This is a simplified example
    if (this.filterOptions.dateRange.start || this.filterOptions.dateRange.end) {
      // In a real app, you would convert the string dates to Date objects
      // and do proper date comparison
      console.log("Date filtering would be applied here")
    }

    this.filteredOrders = filtered
  }

  // Action menu methods
  showActionMenu(event: MouseEvent, orderId: string): void {
    event.stopPropagation()

    // Close the menu if it's already open for this order
    if (this.activeActionMenu === orderId) {
      this.activeActionMenu = null
      return
    }

    // Set the active menu
    this.activeActionMenu = orderId

    // Close other menus
    this.showDatePicker = false
    this.showFilterMenu = false

    // Position the menu next to the clicked button
    setTimeout(() => {
      const button = event.currentTarget as HTMLElement
      const menu = document.querySelector(".action-menu") as HTMLElement

      if (button && menu) {
        const rect = button.getBoundingClientRect()
        menu.style.top = rect.bottom + "px"
        menu.style.left = rect.left - menu.offsetWidth + button.offsetWidth + "px"
      }
    })
  }

  viewOrderDetails(orderId: string): void {
    this.selectedOrderId = orderId
    this.isOrderDetailsVisible = true
    this.activeActionMenu = null
  }

  editOrder(orderId: string): void {
    console.log("Edit order:", orderId)
    this.activeActionMenu = null
    // In a real app, you would navigate to an edit page or open an edit modal
  }

  deleteOrder(orderId: string): void {
    if (confirm("Are you sure you want to delete this order?")) {
      this.orderService.deleteOrder(orderId).subscribe(
        () => {
          // Remove the order from the arrays
          this.orders = this.orders.filter((order) => order.id !== orderId)
          this.filterOrders() // Re-apply filters to update the view
        },
        (error) => {
          console.error("Error deleting order:", error)
        },
      )
    }
    this.activeActionMenu = null
  }

  closeOrderDetails(): void {
    this.isOrderDetailsVisible = false
    this.selectedOrderId = null
  }

  // Date picker methods
  toggleDatePicker(event: MouseEvent): void {
    event.stopPropagation()
    this.showDatePicker = !this.showDatePicker

    // Close other menus
    if (this.showDatePicker) {
      this.showFilterMenu = false
      this.activeActionMenu = null
    }
  }

  resetDateFilter(): void {
    this.filterOptions.dateRange = {
      start: null,
      end: null,
    }
  }

  applyDateFilter(): void {
    // Update the displayed date
    if (this.filterOptions.dateRange.start && this.filterOptions.dateRange.end) {
      this.selectedDate = `${this.filterOptions.dateRange.start} - ${this.filterOptions.dateRange.end}`
    } else if (this.filterOptions.dateRange.start) {
      this.selectedDate = `From ${this.filterOptions.dateRange.start}`
    } else if (this.filterOptions.dateRange.end) {
      this.selectedDate = `Until ${this.filterOptions.dateRange.end}`
    } else {
      this.selectedDate = "23 March 2024" // Default date
    }

    this.applyFilters()
    this.showDatePicker = false
  }

  // Filter menu methods
  toggleFilterMenu(event: MouseEvent): void {
    event.stopPropagation()
    this.showFilterMenu = !this.showFilterMenu

    // Close other menus
    if (this.showFilterMenu) {
      this.showDatePicker = false
      this.activeActionMenu = null
    }
  }

  isFilterSelected(filterType: "categories" | "locations", value: string): boolean {
    return this.filterOptions[filterType].includes(value)
  }

  toggleFilter(filterType: "categories" | "locations", value: string): void {
    const index = this.filterOptions[filterType].indexOf(value)
    if (index === -1) {
      this.filterOptions[filterType].push(value)
    } else {
      this.filterOptions[filterType].splice(index, 1)
    }
  }

  resetFilters(): void {
    this.filterOptions = {
      categories: [],
      dateRange: {
        start: null,
        end: null,
      },
      locations: [],
    }
    this.selectedDate = "23 March 2024" // Reset to default date
    this.applyFilters()
  }

  applyFilters(): void {
    this.filterOrders()
    this.showFilterMenu = false
  }

  // Add ngOnDestroy to clean up event listeners
  ngOnDestroy(): void {
    document.removeEventListener("click", this.handleDocumentClick.bind(this))
  }
}

