import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-visit-approval',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './visit-approval.page.html',
  styleUrls: ['./visit-approval.page.scss'],
})
export class VisitApprovalPage implements AfterViewInit {
  form: FormGroup;

  @ViewChild('signatureCanvas', { static: true })
  signatureCanvas!: ElementRef<HTMLCanvasElement>;
  private sigPad!: SignaturePad;
  signatureData?: string;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // 1. Información General
      siteName: ['', Validators.required],
      visitDate: [new Date().toISOString(), Validators.required],

      // 2. Cobertura (RSSI)
      rssi: [null, [Validators.required, Validators.min(-100), Validators.max(0)]],
      coveragePhoto: [null, Validators.required],

      // 3. Pruebas de Conectividad
      connectivityResults: ['', Validators.required],
      connectivityPhoto: [null, Validators.required],

      // 4. Pruebas en 2.4/5 GHz
      devicesTested: [null, Validators.required],
      devicesPhoto: [null, Validators.required],

      // 5. Acceso Web / Restricciones
      webAccessResults: ['', Validators.required],
      webAccessPhoto: [null, Validators.required],

      // 6. Funcionalidad de equipos
      equipmentFunctionality: ['', Validators.required],
      equipmentPhoto: [null, Validators.required],

      // 7. Relación de equipos recibidos
      equipmentList: ['', Validators.required],
      equipmentListPhoto: [null, Validators.required],

      // 8. Conclusiones (Aprobado / No aprobado)
      conclusion: ['', Validators.required],

      // Firma supervisión/interventoría
      signature: [null],
    });
  }

  ngAfterViewInit() {
    this.sigPad = new SignaturePad(this.signatureCanvas.nativeElement, {
      penColor: 'var(--ion-color-primary)',
      backgroundColor: 'rgba(255,255,255,0)'
    });
  }

  async takePhoto(control: string) {
    const img = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.DataUrl
    });
    this.form.get(control)?.setValue(img.dataUrl);
  }

  clearSignature() {
    this.sigPad.clear();
    this.signatureData = undefined;
    this.form.get('signature')?.reset();
  }

  saveSignature() {
    if (!this.sigPad.isEmpty()) {
      this.signatureData = this.sigPad.toDataURL();
      this.form.get('signature')?.setValue(this.signatureData);
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Payload 5.2.9:', this.form.value);
    // → enviar a tu API o almacenar localmente
  }
}
