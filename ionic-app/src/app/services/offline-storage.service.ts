import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { defineCustomElements } from 'jeep-sqlite/loader';

@Injectable({ providedIn: 'root' })
export class OfflineStorageService {
  private db: SQLiteDBConnection | null = null;
  private sqlite: SQLiteConnection;

  constructor(private http: HttpClient) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.setupWebPlatform();
  }

  private async setupWebPlatform() {
    if (Capacitor.getPlatform() === 'web') {
      defineCustomElements(window);
      await customElements.whenDefined('jeep-sqlite');
      await CapacitorSQLite.initWebStore();
      console.log('[SQLite] Web store initialized');
    }
  }

  async initDB() {
    try {
      this.db = await this.sqlite.createConnection(
        'offlineDB',
        false,
        'no-encryption',
        1,
        false
      );
      await this.db.open();
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS local_site_surveys (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          siteName TEXT,
          siteDate TEXT,
          team TEXT,
          objetivos TEXT,
          observacionesSite TEXT,
          lld TEXT,
          bomDetalle TEXT,
          mantPreventivo TEXT,
          mantCorrectivo TEXT,
          soporte TEXT,
          formacion TEXT,
          aprobacion TEXT,
          firmaSurveyor TEXT,
          firmaTestigo TEXT,
          fotoTopografia TEXT,
          fotoInfraestructura TEXT,
          fotoRF TEXT,
          fotoHeadend TEXT,
          fotoHogares TEXT,
          synced INTEGER DEFAULT 0
        );
      `);
      console.log('[SQLite] Database initialized');
    } catch (error) {
      console.error('[SQLite] initDB error:', error);
    }
  }

  async saveLocally(data: any) {
    if (!this.db) {
      console.error('[SQLite] Database not initialized');
      return;
    }

    const values = [
      data.siteName,
      data.siteDate,
      data.team,
      JSON.stringify(data.objetivos),
      data.observacionesSite,
      JSON.stringify(data.lld),
      data.bomDetalle,
      data.mantPreventivo,
      data.mantCorrectivo,
      data.soporte,
      data.formacion,
      JSON.stringify(data.aprobacion),
      data.firmaSurveyor,
      data.firmaTestigo,
      data.fotoTopografia,
      data.fotoInfraestructura,
      data.fotoRF,
      data.fotoHeadend,
      data.fotoHogares,
    ];

    const stmt = `
      INSERT INTO local_site_surveys (
        siteName, siteDate, team, objetivos, observacionesSite, lld,
        bomDetalle, mantPreventivo, mantCorrectivo, soporte, formacion,
        aprobacion, firmaSurveyor, firmaTestigo, fotoTopografia,
        fotoInfraestructura, fotoRF, fotoHeadend, fotoHogares, synced
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0);
    `;

    try {
      await this.db.run(stmt, values);
      console.log('[SQLite] Data saved locally');
    } catch (error) {
      console.error('[SQLite] saveLocally error:', error);
    }
  }

  async syncWithServer() {
    if (!this.db) {
      console.error('[SQLite] Database not initialized');
      return;
    }

    const net = await Network.getStatus();
    if (!net.connected) {
      console.warn('[Network] No connection available');
      return;
    }

    try {
      const result = await this.db.query(
        'SELECT * FROM local_site_surveys WHERE synced = 0'
      );

      if (!result.values || result.values.length === 0) {
        console.log('[SQLite] No unsynced data to sync');
        return;
      }

      for (const item of result.values) {
        try {
          const body = {
            ...item,
            objetivos: JSON.parse(item.objetivos || '[]'),
            lld: JSON.parse(item.lld || '{}'),
            aprobacion: JSON.parse(item.aprobacion || '{}'),
          };

          await this.http
            .post('http://localhost:8000/api/site-survey', body)
            .toPromise();

          await this.db.run(
            'UPDATE local_site_surveys SET synced = 1 WHERE id = ?',
            [item.id]
          );

          console.log(`[Sync] Item ${item.id} synced successfully`);
        } catch (error) {
          console.error(`[Sync] Error syncing item ${item.id}:`, error);
        }
      }
    } catch (error) {
      console.error('[SQLite] syncWithServer error:', error);
    }
  }

  async closeConnection() {
    try {
      await this.sqlite.closeConnection('offlineDB', false);
      console.log('[SQLite] Connection closed');
    } catch (error) {
      console.error('[SQLite] closeConnection error:', error);
    }
  }
}
