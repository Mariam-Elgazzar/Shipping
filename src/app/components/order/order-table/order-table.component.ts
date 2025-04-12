import { Component, OnInit, OnDestroy } from "@angular/core"
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
  templateUrl: "./order-table.component.html",
  styleUrls: ["./order-table.component.scss"],

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

    // Toggle the menu
    this.activeActionMenu = this.activeActionMenu === orderId ? null : orderId

    // Close other menus
    if (this.activeActionMenu) {
      this.showDatePicker = false
      this.showFilterMenu = false
    }
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
