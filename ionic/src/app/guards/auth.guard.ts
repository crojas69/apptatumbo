import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private navCtrl: NavController) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      this.navCtrl.navigateBack(['/']);
      return false;
    }
    return true;
  }
}
