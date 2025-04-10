import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn()) {
      // Check if route has permission requirements
      if (route.data['requiredPermission']) {
        const hasPermission = this.authService.hasPermission(
          route.data['requiredPermission']
        );
        if (!hasPermission) {
          // Redirect to unauthorized page or dashboard
          return this.router.createUrlTree(['/unauthorized']);
        }
      }

      // Check if route has role requirements
      if (route.data['requiredRole']) {
        const hasRole = this.authService.hasRole(route.data['requiredRole']);
        if (!hasRole) {
          // Redirect to unauthorized page or dashboard
          return this.router.createUrlTree(['/unauthorized']);
        }
      }

      return true;
    }

    // Redirect to login page with return url
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }
}
