import { ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// 1. Importamos la herramienta para habilitar las peticiones HTTP
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 
import { authInterceptor } from './shared/interceptor/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]))

  ]
};
