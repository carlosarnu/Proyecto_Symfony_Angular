// src/app/shared/components/back-to-landing-button/back-to-landing-button-component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-back-to-landing-button',
  standalone: true,
  imports: [RouterModule], // Necesario para usar routerLink
  templateUrl: './back-to-landing-button.html'
})
export class BackToLandingButtonComponent { }
