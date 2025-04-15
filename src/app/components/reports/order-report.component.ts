import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { FormControl, FormGroup } from "@angular/forms"

interface OrderReport {
  id: string
  status: string
  merchant: string
  customer: string
  phone: string
  governorate: string
  city: string
  orderCost: number
  receivedAmount: number
  shippingCost: number
  paidShippingValue: number
  companyValue: number
  date: string
}

@Component({
  selector: "app-order-report",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./order-report.component.html",
  styleUrls: ["./order-report.component.scss"],
})
export class OrderReportComponent implements OnInit {
  orders: OrderReport[] = []
  filteredOrders: OrderReport[] = []

  // Status options
  statusOptions = [
    { value: "new", label: "New" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "pending", label: "Pending" },
    { value: "returned", label: "Returned" },
  ]

  // Entries per page options
  entriesOptions = [10, 25, 50, 100]
  entriesPerPage = 10

  // Current page
  currentPage = 1

  // Search term
  searchTerm = ""

  // Date range form
  dateRangeForm = new FormGroup({
    fromDate: new FormControl(""),
    toDate: new FormControl(""),
  })

  // Selected status
  selectedStatus = "new"

  constructor() {}

  ngOnInit(): void {
    // Load sample data
    this.loadSampleData()
    this.applyFilters()
  }

  loadSampleData(): void {
    this.orders = [
      {
        id: "ORD-10001",
        status: "New",
        merchant: "Electronics Store",
        customer: "John Smith",
        phone: "555-123-4567",
        governorate: "Cairo",
        city: "Nasr City",
        orderCost: 1200.5,
        receivedAmount: 1200.5,
        shippingCost: 50.0,
        paidShippingValue: 50.0,
        companyValue: 1150.5,
        date: "2023-04-15",
      },
      {
        id: "ORD-10002",
        status: "Delivered",
        merchant: "Fashion Outlet",
        customer: "Sarah Johnson",
        phone: "555-234-5678",
        governorate: "Alexandria",
        city: "Miami",
        orderCost: 850.75,
        receivedAmount: 850.75,
        shippingCost: 35.0,
        paidShippingValue: 35.0,
        companyValue: 815.75,
        date: "2023-04-14",
      },
      {
        id: "ORD-10003",
        status: "Cancelled",
        merchant: "Home Goods",
        customer: "Michael Brown",
        phone: "555-345-6789",
        governorate: "Giza",
        city: "Dokki",
        orderCost: 2100.0,
        receivedAmount: 0.0,
        shippingCost: 75.0,
        paidShippingValue: 0.0,
        companyValue: 0.0,
        date: "2023-04-13",
      },
      {
        id: "ORD-10004",
        status: "Pending",
        merchant: "Book Store",
        customer: "Emily Davis",
        phone: "555-456-7890",
        governorate: "Cairo",
        city: "Maadi",
        orderCost: 350.25,
        receivedAmount: 0.0,
        shippingCost: 25.0,
        paidShippingValue: 0.0,
        companyValue: 0.0,
        date: "2023-04-12",
      },
      {
        id: "ORD-10005",
        status: "Delivered",
        merchant: "Sports Equipment",
        customer: "David Wilson",
        phone: "555-567-8901",
        governorate: "Alexandria",
        city: "Montazah",
        orderCost: 1500.0,
        receivedAmount: 1500.0,
        shippingCost: 60.0,
        paidShippingValue: 60.0,
        companyValue: 1440.0,
        date: "2023-04-11",
      },
      {
        id: "ORD-10006",
        status: "Returned",
        merchant: "Tech Gadgets",
        customer: "Lisa Taylor",
        phone: "555-678-9012",
        governorate: "Luxor",
        city: "East Bank",
        orderCost: 3200.0,
        receivedAmount: 3200.0,
        shippingCost: 100.0,
        paidShippingValue: 100.0,
        companyValue: 3100.0,
        date: "2023-04-10",
      },
      {
        id: "ORD-10007",
        status: "New",
        merchant: "Furniture Store",
        customer: "Robert Miller",
        phone: "555-789-0123",
        governorate: "Aswan",
        city: "Aswan City",
        orderCost: 5000.0,
        receivedAmount: 0.0,
        shippingCost: 200.0,
        paidShippingValue: 0.0,
        companyValue: 0.0,
        date: "2023-04-09",
      },
      {
        id: "ORD-10008",
        status: "Delivered",
        merchant: "Grocery Store",
        customer: "Jennifer White",
        phone: "555-890-1234",
        governorate: "Cairo",
        city: "Heliopolis",
        orderCost: 750.5,
        receivedAmount: 750.5,
        shippingCost: 30.0,
        paidShippingValue: 30.0,
        companyValue: 720.5,
        date: "2023-04-08",
      },
      {
        id: "ORD-10009",
        status: "Pending",
        merchant: "Pharmacy",
        customer: "Thomas Anderson",
        phone: "555-901-2345",
        governorate: "Giza",
        city: "6th of October",
        orderCost: 420.75,
        receivedAmount: 0.0,
        shippingCost: 25.0,
        paidShippingValue: 0.0,
        companyValue: 0.0,
        date: "2023-04-07",
      },
      {
        id: "ORD-10010",
        status: "Cancelled",
        merchant: "Toy Store",
        customer: "Jessica Martin",
        phone: "555-012-3456",
        governorate: "Alexandria",
        city: "Smouha",
        orderCost: 900.0,
        receivedAmount: 0.0,
        shippingCost: 40.0,
        paidShippingValue: 0.0,
        companyValue: 0.0,
        date: "2023-04-06",
      },
      {
        id: "ORD-10011",
        status: "New",
        merchant: "Electronics Store",
        customer: "Daniel Clark",
        phone: "555-123-7890",
        governorate: "Cairo",
        city: "New Cairo",
        orderCost: 2500.0,
        receivedAmount: 0.0,
        shippingCost: 80.0,
        paidShippingValue: 0.0,
        companyValue: 0.0,
        date: "2023-04-05",
      },
      {
        id: "ORD-10012",
        status: "Delivered",
        merchant: "Fashion Outlet",
        customer: "Olivia Johnson",
        phone: "555-234-8901",
        governorate: "Luxor",
        city: "West Bank",
        orderCost: 1200.25,
        receivedAmount: 1200.25,
        shippingCost: 55.0,
        paidShippingValue: 55.0,
        companyValue: 1145.25,
        date: "2023-04-04",
      },
    ]
    this.applyFilters()
  }

  applyFilters(): void {
    let filtered = [...this.orders]

    // Filter by status
    if (this.selectedStatus) {
      filtered = filtered.filter((order) => order.status.toLowerCase() === this.selectedStatus.toLowerCase())
    }

    // Filter by date range
    const fromDate = this.dateRangeForm.get("fromDate")?.value
    const toDate = this.dateRangeForm.get("toDate")?.value

    if (fromDate && toDate) {
      const fromDateObj = new Date(fromDate)
      const toDateObj = new Date(toDate)

      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date)
        return orderDate >= fromDateObj && orderDate <= toDateObj
      })
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim()
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(term) ||
          order.merchant.toLowerCase().includes(term) ||
          order.customer.toLowerCase().includes(term) ||
          order.phone.toLowerCase().includes(term) ||
          order.city.toLowerCase().includes(term) ||
          order.governorate.toLowerCase().includes(term),
      )
    }

    this.filteredOrders = filtered
  }

  onSearch(): void {
    this.currentPage = 1
    this.applyFilters()
  }

  onStatusChange(): void {
    this.currentPage = 1
    this.applyFilters()
  }

  onDateRangeChange(): void {
    this.currentPage = 1
    this.applyFilters()
  }

  onEntriesChange(): void {
    this.currentPage = 1
    this.applyFilters()
  }

  search(): void {
    this.applyFilters()
  }

  clearSearch(): void {
    this.searchTerm = ""
    this.applyFilters()
  }

  get totalPages(): number {
    return Math.ceil(this.filteredOrders.length / this.entriesPerPage)
  }

  get paginatedOrders(): OrderReport[] {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage
    return this.filteredOrders.slice(startIndex, startIndex + this.entriesPerPage)
  }

  get showingInfo(): string {
    if (this.filteredOrders.length === 0) {
      return "Showing 0 to 0 of 0 entries"
    }

    const start = (this.currentPage - 1) * this.entriesPerPage + 1
    const end = Math.min(start + this.entriesPerPage - 1, this.filteredOrders.length)
    return `Showing ${start} to ${end} of ${this.filteredOrders.length} entries`
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--
    }
  }
}
