import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // 1. Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url },
      });
    }

    const user = this.authService.getCurrentUser();

    // 2. Check if route requires specific roles
    const allowedRoles = route.data['roles'] as string[] | undefined;
    if (allowedRoles && allowedRoles.length > 0) {
      const hasRole = allowedRoles.some((role) => this.authService.hasRole(role));
      if (!hasRole) {
        return this.router.createUrlTree(['/unauthorized']);
      }
    }

    // 3. Check if route requires specific permissions
    const requiredPermissions = route.data['permissions'] as string[] | undefined;
    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasPermissions = requiredPermissions.every((perm) =>
        this.authService.hasPermission(perm)
      );
      if (!hasPermissions) {
        return this.router.createUrlTree(['/unauthorized']);
      }
    }

    return true;
  }
}
