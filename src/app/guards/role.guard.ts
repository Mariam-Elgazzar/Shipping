import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const allowedRoles = route.data['roles'] as string[];
    const requiredPermissions = route.data['permissions'] as string[];
    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    const hasRole = allowedRoles.some((role) => this.authService.hasRole(role));
    if (!hasRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    // For Employee role, check permissions if specified
    if (user.role === 'Employee' && requiredPermissions?.length) {
      const hasPermissions = requiredPermissions.every((perm) =>
        this.authService.hasPermission(perm)
      );
      if (!hasPermissions) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }

    return true;
  }
}
