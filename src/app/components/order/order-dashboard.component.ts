import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HeaderComponent } from "../header/header.component"
import { OrderStatsComponent } from "./order-stats/order-stats.component"
import { OrderTableComponent } from "./order-table/order-table.component"

@Component({
  selector: "app-order-dashboard",
  standalone: true,
  imports: [CommonModule, HeaderComponent, OrderStatsComponent, OrderTableComponent],
  template: `
    <div class="order-dashboard-container">
      <app-header></app-header>

      <main class="main-content">
        <h1 class="page-title">Orders</h1>

        <div class="stats-cards">
          <app-order-stats></app-order-stats>
        </div>

        <div class="order-table-section">
          <app-order-table></app-order-table>
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

    .stats-cards {
      margin-bottom: 24px;
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
