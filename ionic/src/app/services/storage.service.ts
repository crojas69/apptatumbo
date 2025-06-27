// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private storageService: Storage) {
    this.init();
  }

  // Inicializa el servicio de almacenamiento
  async init() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

  // Guarda datos en el almacenamiento
  async saveData(key: string, value: any) {
    if (this.storage) {
      await this.storage.set(key, value);
    }
  }

  // Recupera datos del almacenamiento
  async getData(key: string) {
    if (this.storage) {
      return await this.storage.get(key);
    }
    return null;
  }

  // Elimina datos del almacenamiento
  async removeData(key: string) {
    if (this.storage) {
      await this.storage.remove(key);
    }
  }
}
