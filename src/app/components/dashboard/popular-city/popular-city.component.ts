import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

interface CityData {
  name: string
  percentage: number
  vehicleTypes: {
    motorcycle: number
    car: number
  }
}

@Component({
  selector: "app-popular-city",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="city-container">
      <div class="city-header">
        <h2>Popular City</h2>
        <div class="period-selector">
          <span>{{ selectedPeriod }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div class="city-content" *ngIf="selectedCity">
        <div class="city-stats">
          <div class="city-total">
            <h3>Total Cities</h3>
            <div class="city-value">{{ totalCities }}</div>
            <div class="city-change" [ngClass]="{'positive': cityChangePercent > 0, 'negative': cityChangePercent < 0}">
              {{ cityChangePercent > 0 ? '+' : '' }}{{ cityChangePercent }}% vs last month
            </div>
          </div>

          <div class="city-highlight">
            <h3>{{ selectedCity.name }}</h3>
            <div class="city-percentage">{{ selectedCity.percentage }}%</div>
            <div class="city-period">this month</div>
          </div>
        </div>

        <div class="city-chart">
          <div class="chart-bars">
            <div class="bar-group">
              <div class="bar motorcycle" [style.height.px]="selectedCity.vehicleTypes.motorcycle * 2"></div>
              <div class="bar-label">Motorcycle</div>
            </div>
            <div class="bar-group">
              <div class="bar car" [style.height.px]="selectedCity.vehicleTypes.car * 2"></div>
              <div class="bar-label">Car</div>
            </div>
          </div>
          <div class="chart-info">
            <p>Display data for this month and you can display anything you want</p>
            <button class="view-detail">
              View Detail
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .city-container {
      background-color: white;
      border-radius: 8px;
      padding: 16px;
      height: 100%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .city-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      h2 {
        font-size: 18px;
        font-weight: 600;
        color: #212b36;
        margin: 0;
      }
    }

    .period-selector {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      color: #637381;
      cursor: pointer;
    }

    .city-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .city-stats {
      display: flex;
      justify-content: space-between;
    }

    .city-total {
      h3 {
        font-size: 14px;
        color: #637381;
        margin: 0 0 8px 0;
      }

      .city-value {
        font-size: 24px;
        font-weight: 600;
        color: #212b36;
      }

      .city-change {
        font-size: 12px;

        &.positive {
          color: #00a76f;
        }

        &.negative {
          color: #ff4d4f;
        }
      }
    }

    .city-highlight {
      text-align: right;

      h3 {
        font-size: 14px;
        color: #637381;
        margin: 0 0 8px 0;
      }

      .city-percentage {
        font-size: 24px;
        font-weight: 600;
        color: #212b36;
      }

      .city-period {
        font-size: 12px;
        color: #00a76f;
        background-color: rgba(0, 167, 111, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
        display: inline-block;
      }
    }

    .city-chart {
      margin-top: 16px;
    }

    .chart-bars {
      display: flex;
      justify-content: center;
      gap: 16px;
      height: 120px;
      align-items: flex-end;
      margin-bottom: 16px;
    }

    .bar-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 40px;
    }

    .bar {
      width: 100%;
      border-radius: 4px 4px 0 0;

      &.motorcycle {
        background-color: #00a76f;
      }

      &.car {
        background-color: #2065d1;
      }
    }

    .bar-label {
      font-size: 12px;
      color: #637381;
      margin-top: 8px;
    }

    .chart-info {
      text-align: center;
      font-size: 12px;
      color: #637381;

      p {
        margin-bottom: 8px;
      }
    }

    .view-detail {
      display: flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      color: #00a76f;
      font-size: 12px;
      cursor: pointer;
      margin: 0 auto;
    }
  `,
  ],
})
export class PopularCityComponent {
  @Input() cityData: CityData[] = []

  selectedPeriod = "This month"
  totalCities = 111
  cityChangePercent = 5

  get selectedCity(): CityData | null {
    return this.cityData && this.cityData.length > 0 ? this.cityData[0] : null
  }
}
