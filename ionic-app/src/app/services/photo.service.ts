import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { environment } from '../../environments/environment';  // Asegúrate de que tu archivo environment.ts esté configurado

interface UploadResponse {
  imageUrl: string;  // Asegúrate de que esto coincida con la respuesta que recibes del servidor
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  async takePhoto(formType: string): Promise<void> {
    // Tomar la foto utilizando la cámara
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,  // Esto retorna una URI de la imagen
      source: CameraSource.Camera,  // Usa la cámara del dispositivo
      quality: 100  // Máxima calidad
    });

    const imageUrl = image.webPath;  // Esta es la URL de la imagen tomada

    // Verificar que la imagen exista (no sea undefined)
    if (!imageUrl) {
      console.error('La imagen no está disponible');
      return;
    }

    // Llamar a la función para subir la imagen al servidor
    this.uploadImage(imageUrl, formType);
  }

  // Subir la imagen al servidor, dependiendo del formulario (site-survey o visit-approval)
  uploadImage(imageUrl: string, formType: string): void {
    const formData = new FormData();
    formData.append('image', imageUrl);
    formData.append('formType', formType);  // Agregar el tipo de formulario como parámetro

    // Realizar la petición POST al servidor para subir la imagen
    this.http.post<UploadResponse>(`${environment.apiUrl}/upload`, formData).subscribe(
      (response) => {
        console.log('Imagen subida correctamente:', response);
        // Guardar la URL de la imagen en la base de datos
        this.saveImageUrl(response.imageUrl, formType);
      },
      (error) => {
        console.error('Error al subir la imagen', error);
      }
    );
  }

  // Función para guardar la URL de la imagen en la base de datos
  saveImageUrl(imageUrl: string, formType: string): void {
    console.log('Guardando URL de imagen en la base de datos:', imageUrl);

    // Enviar la URL y el tipo de formulario al backend para guardarlo en la tabla correspondiente
    const data = {
      imageUrl: imageUrl,
      formType: formType
    };

    // Realizamos una petición para guardar la URL en la base de datos
    this.http.post(`${environment.apiUrl}/save-image-url`, data).subscribe(
      (response) => {
        console.log('URL de la imagen guardada correctamente en la base de datos:', response);
      },
      (error) => {
        console.error('Error al guardar la URL en la base de datos', error);
      }
    );
  }
}
