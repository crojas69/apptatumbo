import { Component } from '@angular/core';
import { RecopilerService } from '../services/recopiler.service';

@Component({
  selector: 'app-recorder',  // Puedes cambiar el selector si lo deseas
  template: '',  // No necesitamos template, no mostramos nada en la UI
  styleUrls: []  // No es necesario CSS adicional
})
export class RecopilerComponent {

  visitApproval = {
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
  };

  siteSurvey = {
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
  };

  constructor(private recopilerService: RecopilerService) {}

  // Método para enviar los datos cuando sea necesario (por ejemplo, cuando se inicia la aplicación)
  sendData() {
    this.recopilerService.sendFormData(this.visitApproval, this.siteSurvey).subscribe(response => {
      console.log('Datos enviados con éxito:', response);
      // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito
    }, error => {
      console.error('Error al enviar los datos:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error
    });
  }

}
