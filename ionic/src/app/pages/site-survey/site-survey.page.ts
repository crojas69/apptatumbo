import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import SignaturePad from 'signature_pad';  // Asegúrate de importar la librería SignaturePad
import { OfflineStorageService } from '../../services/offline-storage.service';
import { SiteSurveyService } from '../../services/site-survey.service';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { defineCustomElements } from 'jeep-sqlite/loader';  // Si usas jeep-sqlite para la web


@Component({
  selector: 'app-site-survey',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './site-survey.page.html',
  styleUrls: ['./site-survey.page.scss'],
})
export class SiteSurveyPage implements AfterViewInit {
  surveyForm: FormGroup;

  @ViewChild('signatureCanvas', { static: true })
  signatureCanvas!: ElementRef<HTMLCanvasElement>;
  private sigPad!: SignaturePad;
  signatureData?: string;

  constructor(
    private fb: FormBuilder,
    private offlineStorage: OfflineStorageService,
    private siteSurveyService: SiteSurveyService
  ) {
    this.surveyForm = this.fb.group({
      siteName: ['', Validators.required],
      address: ['', Validators.required],
      topographicConditions: ['', Validators.required],
      infrastructure: ['', Validators.required],
      rfNoise: [null, Validators.required],
      rfSnr: [null, Validators.required],
      cableLastMile: ['', Validators.required],
      viabilityConnectivity: ['', Validators.required],
      fiberPoints: ['', Validators.required],
      obstacles: ['', Validators.required],
      headendLocation: ['', Validators.required],
      homesLocation: ['', Validators.required],
      topographyPhoto: [null, Validators.required],
      infrastructurePhoto: [null, Validators.required],
      rfSurveyPhoto: [null, Validators.required],
      cablePhoto: [null, Validators.required],
      headendPhoto: [null, Validators.required],
      homesPhoto: [null, Validators.required],
      signature: [null],
    });
  }

  ngAfterViewInit() {
    // Inicializa el SignaturePad
    if (Capacitor.getPlatform() === 'web') {
      const canvas = this.signatureCanvas.nativeElement;
      this.sigPad = new SignaturePad(canvas, {
        penColor: 'var(--ion-color-primary)',  // Puedes cambiar el color
        backgroundColor: 'rgba(255,255,255,0)', // Fondo transparente
        minWidth: 2,  // Ajusta el grosor del lápiz
        maxWidth: 5,  // Ajusta el grosor máximo
      });
    }
  }

  // Función para limpiar la firma
  clearSignature() {
    this.sigPad.clear();
    this.signatureData = undefined;
    this.surveyForm.get('signature')?.reset();
  }

  // Función para guardar la firma
  saveSignature() {
    if (!this.sigPad.isEmpty()) {
      this.signatureData = this.sigPad.toDataURL();
      this.surveyForm.get('signature')?.setValue(this.signatureData);
    }
  }

   // Configuración específica para la plataforma web
   private async setupWebPlatform() {
    if (Capacitor.getPlatform() === 'web') {
      defineCustomElements(window);
      await customElements.whenDefined('jeep-sqlite');
      await CapacitorSQLite.initWebStore();
      console.log('[SQLite] Web store initialized');
    }
  }

  // Función para capturar fotos
  async takePhoto(controlName: string) {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.surveyForm.get(controlName)?.setValue(image.dataUrl ?? null);
    } catch (err) {
      console.error('Error al tomar foto', err);
    }
  }

  // Enviar el formulario
  async submit() {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    const payload = {
      site_survey: this.surveyForm.value
    };

    // Guarda siempre localmente
    await this.offlineStorage.saveOffline(payload);
    console.log('Payload 5.1.1:', payload);
  }
}
