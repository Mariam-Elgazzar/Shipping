import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"

import { OrderStatsComponent } from "./order-stats/order-stats.component"
import { OrderTableComponent } from "./order-table/order-table.component"

@Component({
  selector: "app-order-dashboard",
  standalone: true,

  imports: [CommonModule, OrderStatsComponent, OrderTableComponent],
  templateUrl:"./order-dashboard.component.html",

  styleUrls: ["./order-dashboard.component.scss"],


})
export class OrderDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
