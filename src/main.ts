import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
// import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
// import { authInterceptor } from './app/core/interceptors/auth.interceptor';
// import { errorInterceptor } from './app/core/interceptors/error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([]))],
}).catch((err) => console.error(err));
