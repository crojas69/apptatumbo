import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-modal',
  standalone: false,
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  @Output() closeModal = new EventEmitter();
  @Output() loginSuccess = new EventEmitter();

  loginForm: FormGroup;
  signUpForm: FormGroup;
  isSignUpMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  login(): void {
    const { username, password } = this.loginForm.value;
    
    // Usamos el servicio AuthService en lugar de HttpClient directamente
    this.authService.login(username, password).subscribe({
      next: (res: any) => {
        if (res.success) {
          // El servicio ya maneja el token y el estado de autenticación
          this.loginSuccess.emit();
          this.closeModal.emit();
        } else {
          alert(res.message || 'Credenciales inválidas');
        }
      },
      error: () => {
        alert('Error al iniciar sesión');
      }
    });
  }

  signUp(): void {
    const { username, password, confirmPassword } = this.signUpForm.value;
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    // Usamos el servicio AuthService
    this.authService.signUp(username, password).subscribe({
      next: (res: any) => {
        if (res.success) {
          // Iniciamos sesión automáticamente después del registro
          this.authService.login(username, password).subscribe({
            next: () => {
              this.loginSuccess.emit();
              this.closeModal.emit();
            },
            error: () => {
              alert('Error al iniciar sesión después del registro');
            }
          });
        } else {
          alert(res.message || 'Error al registrar');
        }
      },
      error: () => {
        alert('Error al registrar');
      }
    });
  }

  close(): void {
    this.closeModal.emit();
  }

  toggleSignUpMode(): void {
    this.isSignUpMode = !this.isSignUpMode;
  }
}
