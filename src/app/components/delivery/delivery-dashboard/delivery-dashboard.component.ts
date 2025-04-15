import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { DeliveryOrderTableComponent } from "../delivery-order-table/delivery-order-table.component"

@Component({
  selector: "app-delivery-dashboard",
  standalone: true,
  imports: [CommonModule, DeliveryOrderTableComponent],
  templateUrl: "./delivery-dashboard.component.html",
  styleUrls: ["./delivery-dashboard.component.scss"],
})
export class DeliveryDashboardComponent {
  activeTab = "deliver" // Default tab

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }
}
