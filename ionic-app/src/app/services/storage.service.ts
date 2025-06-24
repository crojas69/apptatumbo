import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private SURVEY_STORAGE_KEY = 'local_surveys';

  constructor(private storage: Storage) {
    this.init();
  }
  
  async init() {
    await this.storage.create();
  }
  

  async saveSurveyOffline(survey: any) {
    const surveys = await this._storage?.get(this.SURVEY_STORAGE_KEY) ?? [];
    surveys.push(survey);
    await this._storage?.set(this.SURVEY_STORAGE_KEY, surveys);
  }

  async getOfflineSurveys(): Promise<any[]> {
    return await this._storage?.get(this.SURVEY_STORAGE_KEY) ?? [];
  }

  async removeUploadedSurveys() {
    return this._storage?.remove(this.SURVEY_STORAGE_KEY);
  }
  async saveOfflineSurvey(data: any) {
    const surveys = (await this.storage.get('offlineSurveys')) || [];
    surveys.push(data);
    await this.storage.set('offlineSurveys', surveys);
  }
}
