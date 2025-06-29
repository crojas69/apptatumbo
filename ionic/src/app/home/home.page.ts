import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OfflineStorageService } from '../services/offline-storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  forms = [
    {
      id: '5.1.1',
      title: '5.1.1 – Estudio de Campo',
      subtitle: 'Site Survey I.E.',
      icon: 'earth-outline',
      route: '/site-survey'
    },
    {
      id: '5.2.9',
      title: '5.2.9 – Visita de Campo',
      subtitle: 'Aprobación Red de Acceso',
      icon: 'checkmark-done-outline',
      route: '/visit-approval'
    }
  ];

  constructor(
    private router: Router,
    private offlineStorage: OfflineStorageService,
    private toastController: ToastController
  ) {}

  goTo(route: string) {
    this.router.navigateByUrl(route);
  }

  async syncNow() {
    await this.offlineStorage.syncPendingSubmissions();
    const toast = await this.toastController.create({
      message: '✅ Sincronización completada',
      duration: 2500,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }
}
