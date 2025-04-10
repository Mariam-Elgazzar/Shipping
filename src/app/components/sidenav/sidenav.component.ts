import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  imports: [MatIcon, MatNavList],
})
export class SidenavComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Shipments', icon: 'local_shipping', route: '/shipments' },
    { label: 'Orders', icon: 'shopping_cart', route: '/orders' },
    { label: 'Customers', icon: 'people', route: '/customers' },
    { label: 'Reports', icon: 'bar_chart', route: '/reports' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];
}
