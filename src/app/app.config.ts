import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAppInitializer, inject } from '@angular/core';
import { routes } from './app.routes';
// import { authInterceptor } from './core/interceptors/auth.interceptor';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([])),
    // provideAppInitializer(() => {
    // const authService = inject(AuthService);
    // return lastValueFrom(authService.checkAuthStatus()).catch((err) => {
    // console.error('Failed to check auth status on init:', err);
    // return null;
    // });
    // }),
  ],
};
