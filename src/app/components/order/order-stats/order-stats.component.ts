import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-order-stats",
  standalone: true,
  imports: [CommonModule],
  templateUrl:"./order-table.component.html",
  styleUrls: ["./order-stats.component.scss"],

})
export class OrderStatsComponent {}
