import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-delivery-vehicles",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vehicles-container">
      <div class="vehicles-header">
        <h2>Delivery Vehicles</h2>
      </div>

      <div class="vehicles-content">
        <div class="vehicles-image">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p5WrSYPpTL9y5Zo0uqMLXbMIBT2JDF.png" alt="Delivery truck" />
        </div>

        <div class="vehicles-stats">
          <div class="stat-value">{{ vehiclesCount }}</div>
          <div class="stat-change" [ngClass]="{'positive': vehiclesChangePercent > 0, 'negative': vehiclesChangePercent < 0}">
            {{ vehiclesChangePercent > 0 ? '+' : '' }}{{ vehiclesChangePercent }}% vs last week
          </div>
          <p class="vehicles-description">{{ vehiclesDescription }}</p>

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
  `,
  styles: [
    `
    .vehicles-container {
      background-color: #00a76f;
      border-radius: 8px;
      padding: 16px;
      height: 100%;
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .vehicles-header {
      margin-bottom: 16px;

      h2 {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
      }
    }

    .vehicles-content {
      display: flex;
      flex-direction: column;
    }

    .vehicles-image {
      margin-bottom: 16px;

      img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        object-fit: cover;
      }
    }

    .vehicles-stats {
      text-align: left;
    }

    .stat-value {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .stat-change {
      font-size: 14px;
      margin-bottom: 8px;

      &.positive {
        color: rgba(255, 255, 255, 0.9);
      }

      &.negative {
        color: #ff4d4f;
      }
    }

    .vehicles-description {
      font-size: 14px;
      margin-bottom: 16px;
      opacity: 0.9;
    }

    .view-detail {
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
  `,
  ],
})
export class DeliveryVehiclesComponent {
  @Input() vehiclesData: any

  vehiclesCount = 765
  vehiclesChangePercent = 5
  vehiclesDescription = "Minim dolor in amet nulla laboris enim dolore consequat."
}
