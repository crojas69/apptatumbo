import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Site Survey</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="outline" (click)="logout()">Logout</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
  imports: [CommonModule, IonicModule]  // ← ¡Clave!
})
export class HeaderComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
