import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-order-banner",
  standalone: true,
  imports: [CommonModule],
  templateUrl:"./order-banner.component.html" ,
  styleUrls: ["./order-banner.component.scss"],
})
export class OrderBannerComponent {}
