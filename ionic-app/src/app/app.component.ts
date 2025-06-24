import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { defineCustomElements } from 'jeep-sqlite/loader';

defineCustomElements(window);
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  
  constructor() {}

  ngOnInit() {    
    this.auth.isAuthenticated().then((isLogged) => {
      this.router.navigateByUrl(isLogged ? '/home' : '/login');
    });
  }
}
