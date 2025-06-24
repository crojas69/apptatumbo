import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Usa el operador de afirmación no nula (!) para indicar que la propiedad se inicializa en otro lugar
  private storage!: Storage;

  constructor(private storageService: Storage) {}

  async init() {
    // Asegúrate de pasar el valor correcto según la plataforma
    const platform = Capacitor.getPlatform();

    if (platform === 'web') {
      // Configuración específica para la web
      this.storage = await this.storageService.create();
    } else {
      // Configuración para otras plataformas
      this.storage = await this.storageService.create();
    }
  }

  async saveData(key: string, value: any) {
    await this.storage.set(key, value);
  }

  async getData(key: string) {
    return await this.storage.get(key);
  }

  async removeData(key: string) {
    await this.storage.remove(key);
  }
}
