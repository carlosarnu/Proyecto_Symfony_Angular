// src/app/modules/landing/landing-component.ts
import { Component } from '@angular/core';
import { PageTitleComponent } from '../../shared/components/page-title/page-title';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [PageTitleComponent, RouterModule],
  templateUrl: './landing-page-component.html',
})
export class LandingComponent {
  // Usamos la misma clave que AppComponent para consistencia
  isDarkMode = localStorage.getItem('darkMode') === 'true';

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    // Aplica la clase dark al html completo
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    // Guarda la preferencia
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
}