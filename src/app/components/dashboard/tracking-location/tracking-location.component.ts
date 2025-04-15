import { Component, Input, type AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-tracking-location",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="location-container">
      <div class="location-header">
        <h2>Tracking Location</h2>
        <button class="expand-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </button>
      </div>

      <div class="map-container" id="map">
        <!-- Map will be rendered here -->
        <div class="map-placeholder">
          <div class="pin-marker">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff4d4f" stroke="#ff4d4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3" fill="white"></circle>
            </svg>
          </div>
        </div>
      </div>

      <div class="location-stats">
        <div class="stat-value">54</div>
        <div class="stat-label">Locations</div>
      </div>
    </div>
  `,
  styles: [
    `
    .location-container {
      background-color: white;
      border-radius: 8px;
      padding: 16px;
      height: 100%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      position: relative;
    }

    .location-header {
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

    .expand-button {
      background: none;
      border: none;
      cursor: pointer;
      color: #637381;
    }

    .map-container {
      height: 200px;
      background-color: #f5f5f5;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
    }

    .map-placeholder {
      width: 100%;
      height: 100%;
      background-image: url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-74.5,40,9,0/400x200?access_token=pk.placeholder');
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pin-marker {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -100%);
    }

    .location-stats {
      position: absolute;
      bottom: 16px;
      right: 16px;
      background-color: white;
      border-radius: 8px;
      padding: 8px 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .stat-value {
      font-size: 20px;
      font-weight: 600;
      color: #212b36;
    }

    .stat-label {
      font-size: 12px;
      color: #637381;
    }
  `,
  ],
})
export class TrackingLocationComponent implements AfterViewInit {
  @Input() locationData: any

  ngAfterViewInit(): void {
    // Here you would initialize a map library like Google Maps or Leaflet
    // For this example, we're using a placeholder image
  }
}
