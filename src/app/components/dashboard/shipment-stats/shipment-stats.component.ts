import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-shipment-stats",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./shipment-stats.component.html",
  styleUrls: ["./shipment-stats.component.scss"],
})
export class ShipmentStatsComponent {
  @Input() totalShipments: { value: number; percentChange: number } = { value: 0, percentChange: 0 }
  @Input() completedShipments: { value: number; percentChange: number } = { value: 0, percentChange: 0 }
  @Input() pendingShipments: { value: number; percentChange: number } = { value: 0, percentChange: 0 }
  @Input() refundedShipments: { value: number; percentChange: number } = { value: 0, percentChange: 0 }
}
