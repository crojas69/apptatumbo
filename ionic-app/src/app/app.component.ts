import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.auth.isAuthenticated().then((isLogged) => {
      if (isLogged) {
        this.router.navigateByUrl('/site-survey');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
    
  }
}
