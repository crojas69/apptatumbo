import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  private dbName = 'survey_db';

  constructor() {}

  async initDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest).result;
        if (!db.objectStoreNames.contains('surveys')) {
          db.createObjectStore('surveys', { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result);
      };

      request.onerror = (event) => {
        reject('Error opening IndexedDB');
      };
    });
  }

  async saveSurvey(data: any) {
    const db = await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction('surveys', 'readwrite');
      const store = transaction.objectStore('surveys');
      const request = store.add(data);

      request.onsuccess = () => {
        resolve('Survey saved');
      };

      request.onerror = () => {
        reject('Error saving survey');
      };
    });
  }

  async getSurveys() {
    const db = await this.initDB();

    return new Promise<any[]>((resolve, reject) => {
      const transaction = db.transaction('surveys', 'readonly');
      const store = transaction.objectStore('surveys');
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject('Error retrieving surveys');
      };
    });
  }
}
