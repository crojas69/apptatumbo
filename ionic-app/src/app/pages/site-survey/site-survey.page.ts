import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OfflineStorageService } from '../../services/offline-storage.service';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonInput, IonLabel, IonItem, IonDatetime, IonTextarea, IonSelect,
  IonSelectOption, IonButton
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
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonInput, IonLabel, IonItem, IonDatetime,
    IonTextarea, IonSelect, IonSelectOption, IonButton, HeaderComponent
  ]
})
export class SiteSurveyPage implements OnInit {
  form = {
    siteName: '', siteDate: '', team: '',
    objetivos: [], observacionesSite: '', lld: {},
    bomDetalle: '', mantPreventivo: '', mantCorrectivo: '',
    soporte: '', formacion: '', aprobacion: {},
    firmaSurveyor: '', firmaTestigo: '',
    fotoTopografia: '', fotoInfraestructura: '', fotoRF: '',
    fotoHeadend: '', fotoHogares: ''
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
    private toastCtrl: ToastController,
    private offlineService: OfflineStorageService
  ) {}

  async ngOnInit() {
    await this.offlineService.initDB();
    await this.offlineService.syncWithServer();
  }

  async submitSurvey() {
    // Validar los campos antes de proceder
    if (!this.isFormValid()) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor completa los campos obligatorios.',
        duration: 2500,
        color: 'danger'
      });
      await toast.present();
      return;
    }
  
    const online = this.network.isOnline.getValue();
    const payload = { ...this.form };
  
    if (online) {
      // Intentar enviar los datos al servidor
      try {
        await this.auth.sendSurvey(payload).toPromise();
        const toast = await this.toastCtrl.create({
          message: 'Encuesta enviada con éxito.',
          duration: 2500,
          color: 'success'
        });
        await toast.present();
        await this.offlineService.saveLocally(payload); // Backup sincronizado
        await this.offlineService.syncWithServer();
      } catch (err) {
        // Manejo de errores
        await this.offlineService.saveLocally(payload);
        const toast = await this.toastCtrl.create({
          message: 'Error al enviar. Guardado localmente.',
          duration: 2500,
          color: 'warning'
        });
        await toast.present();
      }
    } else {
      // Si no hay conexión, guardar localmente
      await this.offlineService.saveLocally(payload);
      const toast = await this.toastCtrl.create({
        message: 'Sin conexión. Guardado localmente.',
        duration: 2500,
        color: 'medium'
      });
      await toast.present();
    }

  }

  isFormValid(): boolean {
    return (
      !!this.form.siteName?.trim() &&
      !!this.form.siteDate?.trim() &&
      !!this.form.team?.trim() &&
      Array.isArray(this.form.objetivos) &&
      this.form.objetivos.length > 0
    );
  }
}
