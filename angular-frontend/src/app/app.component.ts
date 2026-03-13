// src/app/app.component.ts
import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast-component/toast-component';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { AuthStore } from './shared/services/auth-store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isDarkMode = localStorage.getItem('darkMode') === 'true';

  constructor(private renderer: Renderer2, private authStore: AuthStore) {
    this.setDarkClass();

    // Cargar usuario si hay token
    if (this.authStore.token()) {
      this.authStore.loadMe().subscribe({
        error: () => this.authStore.clearSession(),
      });
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.setDarkClass();
  }

  private setDarkClass() {
    if (this.isDarkMode) {
      this.renderer.addClass(document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
    }
  }
}