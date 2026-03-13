// src/app/shared/components/navbar/navbar.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../services/auth-store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  @Input() isDarkMode = false;
  @Output() toggleDarkMode = new EventEmitter<void>();

  constructor(public authStore: AuthStore, private router: Router) {}

  logout() {
    this.authStore.clearSession();
    this.router.navigateByUrl('/');
  }

  onToggleDark() {
    this.toggleDarkMode.emit();
  }
}