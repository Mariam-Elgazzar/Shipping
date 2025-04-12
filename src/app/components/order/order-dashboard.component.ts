// import { Component,  OnInit } from "@angular/core"
// import { CommonModule } from "@angular/common"
// import { HeaderComponent } from "../header/header.component"
// import { OrderBannerComponent } from "./order-banner/order-banner.component"
// import { OrderTableComponent } from "./order-table/order-table.component"
// import { ItemsPackageComponent } from "./items-package/items-package.component"

// @Component({
//   selector: "app-order-dashboard",
//   standalone: true,
//   imports: [CommonModule, OrderBannerComponent, OrderTableComponent, ItemsPackageComponent],
//   templateUrl:"order-dashboard.components.html",
//   styleUrls: ["order-dashboard.components.scss"],

// })
// export class OrderDashboardComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }
import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HeaderComponent } from "../header/header.component"
import { OrderBannerComponent } from "./order-banner/order-banner.component"
import { OrderTableComponent } from "./order-table/order-table.component"
import { ItemsPackageComponent } from "./items-package/items-package.component"

@Component({
  selector: "app-order-dashboard",
  standalone: true,
  imports: [CommonModule, HeaderComponent, OrderBannerComponent, OrderTableComponent, ItemsPackageComponent],
  template: `
    <div class="order-dashboard-container">
      <app-header></app-header>

      <main class="main-content">
        <h1 class="page-title">Inventory</h1>

        <div class="banner-section">
          <app-order-banner></app-order-banner>
        </div>

        <div class="order-content">
          <div class="items-section">
            <app-items-package></app-items-package>
          </div>

          <div class="order-table-section">
            <app-order-table></app-order-table>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
    .order-dashboard-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: #f5f5f5;
    }

    .main-content {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      width: 100%;
    }

    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #212b36;
      margin-bottom: 20px;
    }

    .banner-section {
      margin-bottom: 24px;
    }

    .order-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .items-section {
      margin-bottom: 16px;
    }

    .order-table-section {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }
  `,
  ],
})
export class OrderDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
