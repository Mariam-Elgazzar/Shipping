import { Component,  OnInit,  OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
 import {Order} from "../../../models/order.model"
import { FilterOptions } from "../../../models/order.model"
import  { OrderService } from "../../../services/order.service"
import { OrderDetailsComponent } from "../order-details/order-details.component"
import { AddOrderModalComponent } from "../add-order-modal/add-order-modal.component"
import { EditOrderModalComponent } from "../edit-order-modal/edit-order-modal.component"

// Update the Order interface to include statusNotes


@Component({
  selector: "app-order-table",
  standalone: true,
  imports: [CommonModule, FormsModule, OrderDetailsComponent, AddOrderModalComponent, EditOrderModalComponent],
  templateUrl: "./order-table.component.html",
  styleUrls: ["./order-table.component.scss"],
})
export class OrderTableComponent implements OnInit, OnDestroy {
  // Update the orders array with the new data structure
  orders: Order[] = [
    {
      id: "MHGJ3-0",
      date: "23 Mar 2024",
      customerName: "John Doe",
      government: "Cairo",
      city: "Nasr City",
      orderCost: "$120.00",
      merchant: "Electronics Store",
      category: "Electronic",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse A",
      customerPhone: "+1 (555) 123-4567",
      customerEmail: "john.doe@example.com",
      shippingType: "Express",
      payWay: "Credit Card",
      status: "New",
    },
    {
      id: "MHGJ3-2",
      date: "22 Mar 2024",
      customerName: "Jane Smith",
      government: "Alexandria",
      city: "Miami",
      orderCost: "$85.50",
      merchant: "Fashion Outlet",
      category: "Fashion",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse A",
      customerPhone: "+1 (555) 987-6543",
      customerEmail: "jane.smith@example.com",
      shippingType: "Standard",
      payWay: "Cash on Delivery",
      status: "Delivered",
    },
    {
      id: "MHGJ3-3",
      date: "21 Mar 2024",
      customerName: "Robert Johnson",
      government: "Giza",
      city: "Dokki",
      orderCost: "$210.75",
      merchant: "Grocery Market",
      category: "Food",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse A",
      customerPhone: "+1 (555) 234-5678",
      customerEmail: "robert.johnson@example.com",
      shippingType: "Same Day",
      payWay: "Digital Wallet",
      status: "Partially Delivered",
    },
    {
      id: "MHGJ3-4",
      date: "20 Mar 2024",
      customerName: "Emily Davis",
      government: "Cairo",
      city: "Maadi",
      orderCost: "$150.25",
      merchant: "Home Depot",
      category: "Furniture",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse A",
      customerPhone: "+1 (555) 345-6789",
      customerEmail: "emily.davis@example.com",
      shippingType: "Standard",
      payWay: "Bank Transfer",
      status: "Cancelled by Recipient",
    },
    {
      id: "MHGJ3-5",
      date: "19 Mar 2024",
      customerName: "Michael Wilson",
      government: "Alexandria",
      city: "Montazah",
      orderCost: "$95.00",
      merchant: "Grocery Market",
      category: "Frozen Food",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse B",
      customerPhone: "+1 (555) 456-7890",
      customerEmail: "michael.wilson@example.com",
      shippingType: "Express",
      payWay: "Credit Card",
      status: "Postponed",
    },
    {
      id: "MHGJ3-6",
      date: "18 Mar 2024",
      customerName: "Sarah Brown",
      government: "Giza",
      city: "6th of October",
      orderCost: "$175.30",
      merchant: "Auto Parts Store",
      category: "Auto Parts",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse C",
      customerPhone: "+1 (555) 567-8901",
      customerEmail: "sarah.brown@example.com",
      shippingType: "Standard",
      payWay: "Cash on Delivery",
      status: "Rejected with Payment",
    },
    {
      id: "MHGJ3-7",
      date: "17 Mar 2024",
      customerName: "David Miller",
      government: "Luxor",
      city: "East Bank",
      orderCost: "$65.80",
      merchant: "Grocery Market",
      category: "Frozen Food",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse B",
      customerPhone: "+1 (555) 678-9012",
      customerEmail: "david.miller@example.com",
      shippingType: "Same Day",
      payWay: "Digital Wallet",
      status: "Rejected without Payment",
    },
    {
      id: "MHGJ3-8",
      date: "16 Mar 2024",
      customerName: "Lisa Taylor",
      government: "Aswan",
      city: "Aswan City",
      orderCost: "$130.45",
      merchant: "Chemical Supply Co",
      category: "Chemicals",
      origin: "2775 Ash Dr, San Jose, South Dakota 83475",
      destination: "1901 Thornridge Cir, Shiloh, New Jersey 81063",
      arrivalDate: "5:00 pm",
      weight: "10 kg",
      lastLocation: "Warehouse D",
      customerPhone: "+1 (555) 789-0123",
      customerEmail: "lisa.taylor@example.com",
      shippingType: "International",
      payWay: "Bank Transfer",
      status: "New",
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

  // Add a new property to the class
  showAddOrderModal = false

  // Add properties for edit modal
  showEditOrderModal = false
  selectedOrderData: Order | null = null

  // Update the filterOptions initialization
  filterOptions: FilterOptions = {
    categories: [],
    governments: [],
    cities: [],
    merchants: [],
    dateRange: {
      start: null,
      end: null,
    },
    locations: [],
  }

  // Add these properties to the class
  availableGovernments: string[] = []
  availableCities: string[] = []
  availableMerchants: string[] = []

  // Add properties for assign merchant modal
  showAssignMerchantModal = false
  selectedMerchant: string | null = null
  selectedOrderToAssign: string | null = null

  // Add these properties to the class
  showStatusModal = false
  selectedStatus = ""
  statusNotes = ""
  availableStatuses: string[] = [
    "New",
    "Pending",
    "Delivered",
    "Partially Delivered",
    "Cancelled",
    "Postponed",
    "Rejected with Payment",
    "Rejected without Payment",
    "Cancelled by Recipient",
  ]

  constructor(private orderService: OrderService) {
    this.selectedDate = "All Dates"
  }

  // Update the ngOnInit method to extract governments and cities
  ngOnInit(): void {
    // Add some sample statuses to orders
    this.orders.forEach((order, index) => {
      const statuses = [
        "New",
        "Delivered",
        "Partially Delivered",
        "Cancelled",
        "Postponed",
        "Rejected with Payment",
        "Rejected without Payment",
        "Cancelled by Recipient",
      ]
      order.status = statuses[index % statuses.length]
    })

    this.filteredOrders = [...this.orders]

    // Extract unique categories, governments, cities, and locations for filters
    this.availableCategories = [...new Set(this.orders.map((order) => order.category || ""))]
    this.availableGovernments = [...new Set(this.orders.map((order) => order.government))]
    this.availableCities = [...new Set(this.orders.map((order) => order.city))]
    this.availableMerchants = [...new Set(this.orders.map((order) => order.merchant))]
    this.availableLocations = [...new Set(this.orders.map((order) => order.lastLocation || ""))]

    // Add global click handler to close menus
    document.addEventListener("click", this.handleDocumentClick.bind(this))

    // Add escape key handler to close menus
    document.addEventListener("keydown", this.handleEscapeKey.bind(this))
  }

  // Add this method to handle escape key press
  handleEscapeKey(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.activeActionMenu = null
      this.showDatePicker = false
      this.showFilterMenu = false
      this.showAssignMerchantModal = false
      this.showStatusModal = false
    }
  }

  // Add this method to handle document clicks
  handleDocumentClick(event: MouseEvent): void {
    // Only process if any menu is open
    if (
      this.showDatePicker ||
      this.showFilterMenu ||
      this.activeActionMenu ||
      this.showAssignMerchantModal ||
      this.showStatusModal
    ) {
      const target = event.target as HTMLElement

      // Don't close menus if clicking inside them
      if (
        target.closest(".date-picker") ||
        target.closest(".date-trigger") ||
        target.closest(".filter-menu") ||
        target.closest(".filter-btn") ||
        target.closest(".action-menu") ||
        target.closest(".action-btn") ||
        target.closest(".modal-container") ||
        target.closest(".assign-btn")
      ) {
        return
      }

      // Close all menus
      this.showDatePicker = false
      this.showFilterMenu = false
      this.activeActionMenu = null
      this.showAssignMerchantModal = false
      this.showStatusModal = false
    }
  }

  // Update the filterOrders method to include government and city filters
  filterOrders(): void {
    // Start with all orders
    let filtered = [...this.orders]

    // Apply search term filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(term) ||
          order.customerName.toLowerCase().includes(term) ||
          order.government.toLowerCase().includes(term) ||
          order.city.toLowerCase().includes(term) ||
          (order.category && order.category.toLowerCase().includes(term)),
      )
    }

    // Apply category filters
    if (this.filterOptions.categories.length > 0) {
      filtered = filtered.filter((order) => order.category && this.filterOptions.categories.includes(order.category))
    }

    // Apply government filters
    if (this.filterOptions.governments.length > 0) {
      filtered = filtered.filter((order) => this.filterOptions.governments.includes(order.government))
    }

    // Apply city filters
    if (this.filterOptions.cities.length > 0) {
      filtered = filtered.filter((order) => this.filterOptions.cities.includes(order.city))
    }

    // Apply merchant filters
    if (this.filterOptions.merchants.length > 0) {
      filtered = filtered.filter((order) => this.filterOptions.merchants.includes(order.merchant))
    }

    // Apply location filters
    if (this.filterOptions.locations.length > 0) {
      filtered = filtered.filter(
        (order) => order.lastLocation && this.filterOptions.locations.includes(order.lastLocation),
      )
    }

    // Apply date range filter
    if (this.filterOptions.dateRange.start || this.filterOptions.dateRange.end) {
      filtered = filtered.filter((order) => {
        // Convert order date string to Date object for comparison
        const orderDate = this.parseOrderDate(order.date)

        // If we have a start date, check if order date is after or equal to it
        if (this.filterOptions.dateRange.start) {
          const startDate = new Date(this.filterOptions.dateRange.start)
          if (orderDate < startDate) return false
        }

        // If we have an end date, check if order date is before or equal to it
        if (this.filterOptions.dateRange.end) {
          const endDate = new Date(this.filterOptions.dateRange.end)
          // Set end date to end of day for inclusive filtering
          endDate.setHours(23, 59, 59, 999)
          if (orderDate > endDate) return false
        }

        return true
      })
    }

    this.filteredOrders = filtered
  }

  // Add a helper method to parse the order date string
  parseOrderDate(dateStr: string): Date {
    // Handle date format like "23 Mar 2024"
    const parts = dateStr.split(" ")
    if (parts.length === 3) {
      const day = Number.parseInt(parts[0])
      const month = this.getMonthNumber(parts[1])
      const year = Number.parseInt(parts[2])
      return new Date(year, month, day)
    }
    // Fallback to current date if format doesn't match
    return new Date()
  }

  // Add a helper method to convert month name to month number
  getMonthNumber(monthName: string): number {
    const months: { [key: string]: number } = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    }
    return months[monthName] || 0
  }

  // Update the isFilterSelected method to include government and city
  isFilterSelected(
    filterType: "categories" | "governments" | "cities" | "merchants" | "locations",
    value: string,
  ): boolean {
    return this.filterOptions[filterType].includes(value)
  }

  // Update the toggleFilter method to include government and city
  toggleFilter(filterType: "categories" | "governments" | "cities" | "merchants" | "locations", value: string): void {
    const index = this.filterOptions[filterType].indexOf(value)
    if (index === -1) {
      this.filterOptions[filterType].push(value)
    } else {
      this.filterOptions[filterType].splice(index, 1)
    }
  }

  // Update the resetFilters method to include government and city
  resetFilters(): void {
    this.filterOptions = {
      categories: [],
      governments: [],
      cities: [],
      merchants: [],
      dateRange: {
        start: null,
        end: null,
      },
      locations: [],
    }
    this.selectedDate = "23 March 2024" // Reset to default date
    this.applyFilters()
  }

  // Update the createOrder method to match the new Order interface
  createOrder(orderData: any): void {
    console.log("New order data:", orderData)
    // In a real app, you would call a service to save the order
    // this.orderService.createOrder(orderData).subscribe(...)

    // For now, just add a mock order to the list
    const newOrder: Order = {
      id: `MHGJ3-${Math.floor(Math.random() * 100)}`,
      date: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
      customerName: orderData.customerName,
      government: orderData.government,
      city: orderData.city,
      merchant: orderData.merchantName,
      orderCost: "$100.00", // Default value
      category: orderData.orderType,
      lastLocation: orderData.branch,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      shippingType: orderData.shippingType,
      payWay: orderData.payWay,
      status: "New",
    }

    this.orders.unshift(newOrder)
    this.filterOrders()
  }

  // Add method to update an existing order
  updateOrder(orderData: any): void {
    console.log("Update order data:", orderData)
    // In a real app, you would call a service to update the order
    // this.orderService.updateOrder(orderData).subscribe(...)

    // For now, just update the order in the list
    const index = this.orders.findIndex((order) => order.id === orderData.id)
    if (index !== -1) {
      // Update the order with new data while preserving the date
      const date = this.orders[index].date
      this.orders[index] = {
        ...orderData,
        date: date,
        category: orderData.orderType,
      }
      this.filterOrders()
    }
  }

  // Add a new method to show the status change modal
  showStatusChangeModal(orderId: string): void {
    this.selectedOrderId = orderId
    this.showStatusModal = true

    // Find the current order to get its status
    const order = this.orders.find((o) => o.id === orderId)
    if (order) {
      this.selectedStatus = order.status || "New"
      this.statusNotes = ""
    }
  }

  // Add a method to close the status modal
  closeStatusModal(): void {
    this.showStatusModal = false
    this.selectedOrderId = null
  }

  // Add a method to save the status change
  saveStatusChange(): void {
    if (!this.selectedOrderId || !this.selectedStatus) {
      return
    }

    // Find the order and update its status
    const orderIndex = this.orders.findIndex((order) => order.id === this.selectedOrderId)
    if (orderIndex !== -1) {
      this.orders[orderIndex].status = this.selectedStatus
      this.orders[orderIndex].statusNotes = this.statusNotes

      // In a real app, you would call a service to update the order status
      // this.orderService.updateOrderStatus(this.selectedOrderId, this.selectedStatus, this.statusNotes).subscribe(...)

      // Update the filtered orders
      this.filterOrders()
    }

    this.closeStatusModal()
  }

  // Action menu methods
  // Update the showActionMenu method to better position the menu
  showActionMenu(event: MouseEvent, orderId: string): void {
    event.stopPropagation()

    // Toggle the menu
    if (this.activeActionMenu === orderId) {
      this.activeActionMenu = null
      return
    }

    this.activeActionMenu = orderId

    // Close other menus
    this.showDatePicker = false
    this.showFilterMenu = false
    this.showAssignMerchantModal = false
    this.showStatusModal = false

    // Position the menu next to the clicked button
    setTimeout(() => {
      const button = event.currentTarget as HTMLElement
      const menu = document.querySelector(".action-menu") as HTMLElement

      if (button && menu) {
        const rect = button.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const menuHeight = menu.offsetHeight

        // Position the menu
        menu.style.position = "fixed"

        // Check if menu would go off the bottom of the screen
        if (rect.bottom + menuHeight > windowHeight) {
          // Position above the button if it would go off the bottom
          menu.style.top = `${rect.top - menuHeight}px`
        } else {
          // Position below the button
          menu.style.top = `${rect.bottom + 5}px`
        }

        // Horizontal positioning
        if (rect.left + menu.offsetWidth > window.innerWidth) {
          // Align to the right edge of the button if it would go off the right side
          menu.style.left = `${rect.right - menu.offsetWidth}px`
        } else {
          // Align to the left edge of the button
          menu.style.left = `${rect.left}px`
        }

        // Ensure the menu is above other elements
        menu.style.zIndex = "1050"
      }
    })
  }

  viewOrderDetails(orderId: string): void {
    this.selectedOrderId = orderId
    this.isOrderDetailsVisible = true
    this.activeActionMenu = null
  }

  editOrder(orderId: string): void {
    // Find the order to edit
    const orderToEdit = this.orders.find((order) => order.id === orderId)
    if (orderToEdit) {
      this.selectedOrderId = orderId
      this.selectedOrderData = orderToEdit
      this.showEditOrderModal = true
    }
    this.activeActionMenu = null
  }

  closeEditModal(): void {
    this.showEditOrderModal = false
    this.selectedOrderId = null
    this.selectedOrderData = null
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
  // Update the toggleDatePicker method to position the date picker correctly
  toggleDatePicker(event: MouseEvent): void {
    event.stopPropagation()
    this.showDatePicker = !this.showDatePicker

    // Close other menus
    if (this.showDatePicker) {
      this.showFilterMenu = false
      this.activeActionMenu = null
      this.showAssignMerchantModal = false
      this.showStatusModal = false

      // Position the date picker below the trigger button
      setTimeout(() => {
        const trigger = event.currentTarget as HTMLElement
        const datePicker = document.querySelector(".date-picker") as HTMLElement

        if (trigger && datePicker) {
          const rect = trigger.getBoundingClientRect()
          datePicker.style.position = "absolute"
          datePicker.style.top = `${rect.bottom + window.scrollY + 5}px`
          datePicker.style.left = `${rect.left}px`
        }
      })
    }
  }

  resetDateFilter(): void {
    this.filterOptions.dateRange = {
      start: null,
      end: null,
    }
    this.selectedDate = "All Dates"
  }

  // Update the applyDateFilter method to format the displayed date better
  applyDateFilter(): void {
    // Format dates for display
    if (this.filterOptions.dateRange.start && this.filterOptions.dateRange.end) {
      const startDate = new Date(this.filterOptions.dateRange.start)
      const endDate = new Date(this.filterOptions.dateRange.end)

      // Format dates as "DD MMM YYYY"
      const formatDate = (date: Date) => {
        const day = date.getDate()
        const month = date.toLocaleString("en-US", { month: "short" })
        const year = date.getFullYear()
        return `${day} ${month} ${year}`
      }

      this.selectedDate = `${formatDate(startDate)} - ${formatDate(endDate)}`
    } else if (this.filterOptions.dateRange.start) {
      const startDate = new Date(this.filterOptions.dateRange.start)
      this.selectedDate = `From ${startDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}`
    } else if (this.filterOptions.dateRange.end) {
      const endDate = new Date(this.filterOptions.dateRange.end)
      this.selectedDate = `Until ${endDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}`
    } else {
      this.selectedDate = "All Dates"
    }

    this.applyFilters()
    this.showDatePicker = false
  }

  // Filter menu methods
  // Update the toggleFilterMenu method to position the filter menu correctly
  toggleFilterMenu(event: MouseEvent): void {
    event.stopPropagation()
    this.showFilterMenu = !this.showFilterMenu

    // Close other menus
    if (this.showFilterMenu) {
      this.showDatePicker = false
      this.activeActionMenu = null
      this.showAssignMerchantModal = false
      this.showStatusModal = false

      // Position the filter menu below the filter button
      setTimeout(() => {
        const button = event.currentTarget as HTMLElement
        const filterMenu = document.querySelector(".filter-dropdown") as HTMLElement

        if (button && filterMenu) {
          const rect = button.getBoundingClientRect()
          filterMenu.style.position = "absolute"
          filterMenu.style.top = `${rect.bottom + window.scrollY + 5}px`
          filterMenu.style.left = `${rect.left - filterMenu.offsetWidth + button.offsetWidth}px`
        }
      })
    }
  }

  applyFilters(): void {
    this.filterOrders()
    this.showFilterMenu = false
  }

  // Add a method to handle adding a new order
  addNewOrder(): void {
    this.showAddOrderModal = true
  }

  // Add ngOnDestroy to clean up event listeners
  ngOnDestroy(): void {
    document.removeEventListener("click", this.handleDocumentClick.bind(this))
    document.removeEventListener("keydown", this.handleEscapeKey.bind(this))
  }

  formatDateRange(): string {
    if (this.filterOptions.dateRange.start && this.filterOptions.dateRange.end) {
      return `${this.filterOptions.dateRange.start} - ${this.filterOptions.dateRange.end}`
    }
    return "Select date range"
  }

  // Add methods to handle assign merchant modal
  showAssignModal(orderId: string): void {
    this.selectedOrderToAssign = orderId
    this.selectedMerchant = ""
    this.showAssignMerchantModal = true
  }

  closeAssignModal(): void {
    this.showAssignMerchantModal = false
    this.selectedOrderToAssign = null
  }

  assignMerchant(): void {
    if (!this.selectedOrderToAssign || !this.selectedMerchant) {
      return
    }

    // Find the order and update it
    const orderIndex = this.orders.findIndex((order) => order.id === this.selectedOrderToAssign)
    if (orderIndex !== -1) {
      this.orders[orderIndex].assignedMerchant = this.selectedMerchant

      // In a real app, you would call a service to update the order
      // this.orderService.assignMerchant(this.orderToAssign, this.selectedMerchant).subscribe(...)

      // Update the filtered orders
      this.filterOrders()
    }

    this.closeAssignModal()
  }

  // Method to get order count by status
  getOrderCountByStatus(status: string): number {
    return this.orders.filter((order) => order.status === status).length
  }

  // Method to get status class
  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      New: "new",
      Delivered: "delivered",
      "Partially Delivered": "partially-delivered",
      Cancelled: "cancelled",
      "Cancelled by Recipient": "cancelled",
      Postponed: "postponed",
      Rejected: "rejected",
      "Rejected with Payment": "rejected",
      "Rejected without Payment": "rejected",
    }

    return statusMap[status] || "new"
  }
}
