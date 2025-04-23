import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatDialogModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  currentUser: any = null;
  private userSub!: Subscription;
  currentUserSubject = new BehaviorSubject<any>(null);
  showHeader = true; // 💡 نتحكم بيها في عرض الناف
  role: string | null = null;



  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    // ⛔ منع الرجوع للخلف بعد الـ logout
    this.role = this.authService.getCurrentUser()?.role || null;

    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };

    // ✅ إخفاء الـ Navbar في صفحات الأوث
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const hiddenRoutes = ['/login', '/register', '/forgot-password'];
        this.showHeader = !hiddenRoutes.includes(event.urlAfterRedirects);
      });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  logout(): void {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }
}
