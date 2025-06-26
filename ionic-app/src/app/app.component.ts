import { Component, inject, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { defineCustomElements } from 'jeep-sqlite/loader';
import { RecopilerService } from './services/recopiler.service';

defineCustomElements(window);
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  
  constructor(private recopilerService: RecopilerService) {}

  ngOnInit() {    
    this.auth.isAuthenticated().then((isLogged) => {
      this.router.navigateByUrl(isLogged ? '/home' : '/login');
    });

    this.recopilerService.sendFormData(
      {
        siteName: 'Sitio de ejemplo',
        visitDate: '2025-06-25',
        rssi: '-80',
        coveragePhoto: 'foto_coverage.jpg',
        connectivityResults: 'Conectividad buena',
        connectivityPhoto: 'foto_connectivity.jpg',
        devicesTested: 'Dispositivo 1, Dispositivo 2',
        devicesPhoto: 'foto_devices.jpg',
        webAccessResults: 'Acceso a internet sin problemas',
        webAccessPhoto: 'foto_web_access.jpg',
        equipmentFunctionality: 'Todo funcional',
        equipmentPhoto: 'foto_equipment.jpg',
        equipmentList: 'Equipo A, Equipo B',
        equipmentListPhoto: 'foto_equipment_list.jpg',
        conclusion: 'Visita exitosa',
        signature: 'Firma del técnico'
      },
      {
        siteName: 'Sitio de ejemplo',
        address: 'Calle Falsa 123',
        topographicConditions: 'Terreno plano',
        topographyPhoto: 'foto_topography.jpg',
        infrastructure: 'Infraestructura adecuada',
        infrastructurePhoto: 'foto_infrastructure.jpg',
        rfNoise: 'Bajo ruido RF',
        rfSnr: '35 dB',
        rfSurveyPhoto: 'foto_rf_survey.jpg',
        cableLastMile: 'Cable de fibra',
        cablePhoto: 'foto_cable.jpg',
        headendLocation: 'Ubicación adecuada',
        headendPhoto: 'foto_headend.jpg',
        homesLocation: 'Ubicación en zona urbana',
        homesPhoto: 'foto_homes.jpg',
        signature: 'Firma del técnico'
      }
    ).subscribe(response => {
      console.log('Datos enviados:', response);
    });
  }
}
