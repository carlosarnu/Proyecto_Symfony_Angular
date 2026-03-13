import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Rutas corregidas a tus servicios
import { AuthStore } from '../services/auth-store';
import { ToastService } from '../services/toast-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const toast = inject(ToastService);

  // Añadir token si existe
  const token = authStore.token();
  if (token && !req.headers.has('Authorization')) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        // Limpiar sesión y redirigir al login
        authStore.clearSession();
        router.navigateByUrl('/login');
        toast.error('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
      }
      return throwError(() => err);
    })
  );
};