// import { Component } from "@angular/core"
// import { CommonModule } from "@angular/common"

// @Component({
//   selector: "app-order-stats",
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl:"./order-table.component.html",
//   styleUrls: ["./order-stats.component.scss"],

// })
// export class OrderStatsComponent {}

import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-order-stats",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats-container">
      <!-- Delivery Vehicles Card - Left -->
      <div class="stats-card vehicles-card">
        <div class="card-header">
          <div class="icon-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <h3>Delivery Vehicles</h3>
        </div>

        <div class="card-content">
          <div class="content-left">
            <div class="stats-label">Minim dolor in amet<br>nulla laboris</div>
            <div class="stats-value">956</div>
            <div class="stats-change positive">+5% vs last week</div>

            <button class="view-detail-btn">
              View Detail
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <div class="content-right">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0Tc0TFeLwar9EeaDJNG61NlbU72fC3.png" alt="Delivery truck" class="vehicle-image">
          </div>
        </div>
      </div>

      <!-- Delivery Vehicles Card - Right -->
      <div class="stats-card delivery-chart-card">
        <div class="card-header">
          <div class="icon-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <h3>Delivery Vehicles</h3>
        </div>

        <div class="card-content chart-content">
          <div class="chart-stats">
            <div class="chart-stat">
              <div class="stat-label">Highest delivery</div>
              <div class="stat-value">569</div>
            </div>

            <div class="chart-stat">
              <div class="stat-label">Low delivery</div>
              <div class="stat-value">112</div>
            </div>
          </div>

          <div class="chart-visualization">
            <!-- Simplified chart visualization -->
            <div class="chart-bars">
              <div class="chart-bar" style="height: 60%;"></div>
              <div class="chart-bar" style="height: 40%;"></div>
              <div class="chart-bar" style="height: 80%;"></div>
              <div class="chart-bar" style="height: 50%;"></div>
              <div class="chart-bar" style="height: 70%;"></div>
              <div class="chart-bar" style="height: 45%;"></div>
              <div class="chart-bar" style="height: 65%;"></div>
            </div>

            <div class="chart-y-axis">
              <div class="y-label">800km</div>
              <div class="y-label">300 km</div>
              <div class="y-label">100km</div>
              <div class="y-label">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 20px;
    }

    .stats-card {
      background-color: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      height: 100%;
    }

    .vehicles-card {
      background-color: #00a76f;
      color: white;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;

      h3 {
        font-size: 16px;
        font-weight: 500;
        margin: 0;
      }
    }

    .icon-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);

      svg {
        color: white;
      }
    }

    .card-content {
      display: flex;
      justify-content: space-between;
    }

    .content-left {
      display: flex;
      flex-direction: column;
    }

    .stats-label {
      font-size: 14px;
      opacity: 0.8;
      margin-bottom: 8px;
    }

    .stats-value {
      font-size: 36px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .stats-change {
      font-size: 14px;
      margin-bottom: 16px;

      &.positive {
        color: white;
      }
    }

    .view-detail-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      background-color: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }

    .content-right {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .vehicle-image {
      max-width: 180px;
      height: auto;
    }

    .delivery-chart-card {
      background-color: #00a76f;
      color: white;
    }

    .chart-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .chart-stats {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .chart-stat {
      .stat-label {
        font-size: 14px;
        opacity: 0.8;
      }

      .stat-value {
        font-size: 28px;
        font-weight: 600;
      }
    }

    .chart-visualization {
      flex: 1;
      display: flex;
      position: relative;
    }

    .chart-bars {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
      height: 150px;
    }

    .chart-bar {
      width: 20px;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 4px 4px 0 0;
    }

    .chart-y-axis {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 12px;
      opacity: 0.7;
    }
  `,
  ],
})
export class OrderStatsComponent {}
