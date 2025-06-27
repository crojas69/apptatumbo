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
import SignaturePad from 'signature_pad';
import { OfflineStorageService } from '../../services/offline-storage.service';
import { VisitApprovalService } from '../../services/visit-approval.service';
import { Capacitor } from '@capacitor/core';  // Asegúrate de importar Capacitor
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { defineCustomElements } from 'jeep-sqlite/loader';  // Si usas jeep-sqlite para la web

@Component({
  selector: 'app-visit-approval',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './visit-approval.page.html',
  styleUrls: ['./visit-approval.page.scss'],
})
export class VisitApprovalPage implements AfterViewInit {
  visitForm: FormGroup;
  @ViewChild('signatureCanvas', { static: true })
  signatureCanvas!: ElementRef<HTMLCanvasElement>;
  private sigPad!: SignaturePad;
  signatureData?: string;

  constructor(
    private fb: FormBuilder,
    private offlineStorage: OfflineStorageService,
    private visitApprovalService: VisitApprovalService
  ) {
    this.visitForm = this.fb.group({
      siteName: ['', Validators.required],
      visitDate: [new Date().toISOString(), Validators.required],
      rssi: [null, [Validators.required, Validators.min(-100), Validators.max(0)]],
      coveragePhoto: [null, Validators.required],
      connectivityResults: ['', Validators.required],
      connectivityPhoto: [null, Validators.required],
      devicesTested: [null, Validators.required],
      devicesPhoto: [null, Validators.required],
      webAccessResults: ['', Validators.required],
      webAccessPhoto: [null, Validators.required],
      equipmentFunctionality: ['', Validators.required],
      equipmentPhoto: [null, Validators.required],
      equipmentList: ['', Validators.required],
      equipmentListPhoto: [null, Validators.required],
      conclusion: ['', Validators.required],
      signature: [null],
    });
  }

  ngAfterViewInit() {
    // Si estamos en plataforma web, cargamos los componentes necesarios
    if (!Capacitor.isNativePlatform()) {
      this.setupWebPlatform();
    }

    this.sigPad = new SignaturePad(this.signatureCanvas.nativeElement, {
      penColor: 'var(--ion-color-primary)',
      backgroundColor: 'rgba(255,255,255,0)'  // Transparente para el fondo
    });
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

  /** Captura una foto y la asigna al control indicado */
  async takePhoto(control: string) {
    try {
      const img = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.visitForm.get(control)?.setValue(img.dataUrl);
    } catch (error) {
      console.error('Error al tomar foto', error);
    }
  }

  clearSignature() {
    this.sigPad.clear();
    this.signatureData = undefined;
    this.visitForm.get('signature')?.reset();
  }

  saveSignature() {
    if (!this.sigPad.isEmpty()) {
      this.signatureData = this.sigPad.toDataURL();
      this.visitForm.get('signature')?.setValue(this.signatureData);
    }
  }

  async submit() {
    if (this.visitForm.invalid) {
      this.visitForm.markAllAsTouched();
      return;
    }

    const payload = {
      visit_approval: this.visitForm.value
    };

    // Guarda siempre localmente
    await this.offlineStorage.saveOffline(payload);

    console.log('Payload 5.2.9:', payload);

    // (Opcional) Intento de envío inmediato con tu servicio existente
    // this.visitApprovalService.submitVisitApproval(this.visitForm.value).subscribe(...);
  }
}
