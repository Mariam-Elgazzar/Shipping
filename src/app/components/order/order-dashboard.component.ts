import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HeaderComponent } from "../header/header.component"
import { OrderStatsComponent } from "./order-stats/order-stats.component"
import { OrderTableComponent } from "./order-table/order-table.component"

@Component({
  selector: "app-order-dashboard",
  standalone: true,
  imports: [CommonModule, OrderStatsComponent, OrderTableComponent],
  templateUrl:"./order-dashboard.components.html",
  styleUrls: ["./order-dashboard.components.scss"],
})
export class OrderDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
