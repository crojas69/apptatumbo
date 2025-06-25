import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  // Asegúrate de importar IonicModule
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import SignaturePad from 'signature_pad';  // Asegúrate de tener esta librería instalada
import { VisitApprovalService } from '../../services/visit-approval.service';  // Asegúrate de tener tu servicio de API configurado

@Component({
  selector: 'app-visit-approval',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],  // Asegúrate de que IonicModule esté en imports
  templateUrl: './visit-approval.page.html',
  styleUrls: ['./visit-approval.page.scss'],
})
export class VisitApprovalPage implements AfterViewInit {
  visitForm: FormGroup;
  @ViewChild('signatureCanvas', { static: true }) signatureCanvas!: ElementRef<HTMLCanvasElement>;
  private sigPad!: SignaturePad;
  signatureData?: string;

  constructor(private fb: FormBuilder, private visitApprovalService: VisitApprovalService) {
    this.visitForm = this.fb.group({
      // Información general
      siteName: ['', Validators.required],
      visitDate: [new Date().toISOString(), Validators.required],

      // Cobertura (RSSI)
      rssi: [null, [Validators.required, Validators.min(-100), Validators.max(0)]],
      coveragePhoto: [null, Validators.required],

      // Pruebas de conectividad
      connectivityResults: ['', Validators.required],
      connectivityPhoto: [null, Validators.required],

      // Pruebas en 2.4/5 GHz
      devicesTested: [null, Validators.required],
      devicesPhoto: [null, Validators.required],

      // Acceso Web / Restricciones
      webAccessResults: ['', Validators.required],
      webAccessPhoto: [null, Validators.required],

      // Funcionalidad de equipos
      equipmentFunctionality: ['', Validators.required],
      equipmentPhoto: [null, Validators.required],

      // Relación de equipos recibidos
      equipmentList: ['', Validators.required],
      equipmentListPhoto: [null, Validators.required],

      // Conclusiones
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

  // Función para tomar fotos
  async takePhoto(control: string) {
    const img = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.DataUrl
    });
    this.visitForm.get(control)?.setValue(img.dataUrl); // Guardar la imagen en el formulario
  }

  // Función para limpiar la firma
  clearSignature() {
    this.sigPad.clear();
    this.signatureData = undefined;
    this.visitForm.get('signature')?.reset(); // Resetear el valor en el formulario
  }

  // Función para guardar la firma
  saveSignature() {
    if (!this.sigPad.isEmpty()) {
      this.signatureData = this.sigPad.toDataURL();
      this.visitForm.get('signature')?.setValue(this.signatureData); // Guardar la firma en el formulario
    }
  }

  // Función para enviar el formulario
  submit() {
    if (this.visitForm.invalid) {
      this.visitForm.markAllAsTouched();
      return;
    }

    console.log('Payload 5.2.9:', this.visitForm.value);
    
    // Enviar el formulario a la API (suponiendo que tienes un servicio de VisitApproval)
    this.visitApprovalService.submitVisitApproval(this.visitForm.value).subscribe(
      (response) => {
        console.log('Formulario enviado correctamente', response);
      },
      (error) => {
        console.error('Error al enviar formulario', error);
      }
    );
  }
}
