import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../../services/auth.service"
import { MatIcon } from "@angular/material/icon"
import { MatNavList } from "@angular/material/list"
import { MatDialogModule } from "@angular/material/dialog"
import { MatToolbar } from "@angular/material/toolbar"
import { MatMenuModule } from "@angular/material/menu"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [CommonModule, MatIcon, MatNavList, MatDialogModule, MatToolbar, MatMenuModule],
  standalone: true,
})
export class HeaderComponent {
  isMobileMenuOpen = false

  constructor(
    private router: Router,
    public authService: AuthService,
  ) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
