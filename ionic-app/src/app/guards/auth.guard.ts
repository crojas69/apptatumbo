import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const authenticated = await this.auth.isAuthenticated();
    if (!authenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
