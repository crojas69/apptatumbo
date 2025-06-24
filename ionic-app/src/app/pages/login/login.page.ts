import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './login.page.html',
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async login() {
    this.auth.login(this.email, this.password).subscribe({
      next: async () => {
        this.router.navigateByUrl('/site-survey');
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Error al iniciar sesión',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      },
    });
  }
}
