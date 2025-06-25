// src/app/site-survey/site-survey.page.ts

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
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import SignaturePad from 'signature_pad';
import { SiteSurveyService } from '../../services/site-survey.service';  // 

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

  constructor(private fb: FormBuilder) {
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

      signature: [null]
    });
  }

  ngAfterViewInit() {
    this.sigPad = new SignaturePad(this.signatureCanvas.nativeElement, {
      penColor: 'var(--ion-color-primary)',
      backgroundColor: 'rgba(255,255,255,0)'
    });
  }

  /** Captura una foto y la asigna al formulario, usando null si dataUrl es undefined */
  async takePhoto(controlName: string) {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl
      });
      this.surveyForm.get(controlName)
        ?.setValue(image.dataUrl ?? null);
    } catch (err) {
      console.error('Error al tomar foto', err);
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    console.log('Image URI: ', image.webPath);
  }

  clearSignature() {
    this.sigPad.clear();
    this.signatureData = undefined;
    this.surveyForm.get('signature')?.reset();
  }

  saveSignature() {
    if (!this.sigPad.isEmpty()) {
      this.signatureData = this.sigPad.toDataURL();
      this.surveyForm.get('signature')?.setValue(this.signatureData);
    }
  }

  submit() {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }
    console.log('Payload 5.1.1:', this.surveyForm.value);
    // TODO: enviar a API o guardar localmente
  }
}
