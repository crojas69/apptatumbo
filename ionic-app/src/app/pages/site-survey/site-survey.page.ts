import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
  IonItem,
  IonDatetime,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton
} from '@ionic/angular/standalone';

import { NetworkService } from '../../services/network.service';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { HeaderComponent } from '../../components/header.component';

@Component({
  selector: 'app-site-survey',
  standalone: true,
  templateUrl: './site-survey.page.html',
  styleUrls: ['./site-survey.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonLabel,
    IonItem,
    IonDatetime,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    HeaderComponent
  ]
})
export class SiteSurveyPage {
  form: any = {
    siteName: '',
    siteDate: '',
    team: '',
    objetivos: {},
    observaciones: '',
    bomDetalle: '',
    mantPreventivo: '',
    mantCorrectivo: '',
    formacion: '',
  };

  objetivos = [
    { label: 'Evaluar viabilidad de conectividad', value: 'viabilidad' },
    { label: 'Identificar puntos de conexión', value: 'ubicacion_puntos' },
    { label: 'Definir rutas y obstáculos', value: 'rutas_optimas' },
    { label: 'Ubicación del Headend', value: 'headend' }
  ];

  constructor(
    private network: NetworkService,
    private storage: StorageService,
    private auth: AuthService,
    private toastCtrl: ToastController
  ) {}

  async submitSurvey() {
    const online = this.network.isOnline.getValue();
    const payload = { ...this.form };

    if (online) {
      this.auth.sendSurvey(payload).subscribe({
        next: async () => {
          const toast = await this.toastCtrl.create({
            message: 'Survey enviado con éxito',
            duration: 2000,
            color: 'success'
          });
          toast.present();
        },
        error: async () => {
          await this.storage.saveOfflineSurvey(payload);
          const toast = await this.toastCtrl.create({
            message: 'Error enviando. Guardado localmente.',
            duration: 2000,
            color: 'warning'
          });
          toast.present();
        }
      });
    } else {
      await this.storage.saveOfflineSurvey(payload);
      const toast = await this.toastCtrl.create({
        message: 'Sin conexión. Survey guardado localmente.',
        duration: 2000,
        color: 'medium'
      });
      toast.present();
    }
  }
}
