import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HeaderComponent } from "../header/header.component"
import { OrderBannerComponent } from "./order-banner/order-banner.component"
import { OrderTableComponent } from "./order-table/order-table.component"
import { ItemsPackageComponent } from "./items-package/items-package.component"

@Component({
  selector: "app-order-dashboard",
  standalone: true,
  imports: [CommonModule, OrderBannerComponent, OrderTableComponent, ItemsPackageComponent],
  templateUrl:"order-dashboard.components.html",
  styleUrls: ["order-dashboard.components.scss"],

})
export class OrderDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
