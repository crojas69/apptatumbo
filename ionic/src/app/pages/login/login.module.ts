import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: LoginPage }]),
    LoginPage // 👈 esto importa el componente standalone
  ],
})
export class LoginPageModule {}
