import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { defineCustomElements } from 'jeep-sqlite/loader';

@Injectable({ providedIn: 'root' })
export class OfflineStorageService {
  private db: SQLiteDBConnection | null = null;
  private sqlite: SQLiteConnection;

  constructor(private http: HttpClient) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.setupPlatform();
    this.initDB();
    this.setupNetworkSync();
  }

  // Maneja la configuración de plataformas nativas y web
  private async setupPlatform() {
    if (Capacitor.getPlatform() === 'web') {
      // Definición de custom elements solo para web
      defineCustomElements(window);
      await customElements.whenDefined('jeep-sqlite');  // Espera que el componente se defina en el DOM

      // Aquí inicializamos la base de datos para la web
      await CapacitorSQLite.initWebStore();
      console.log('[SQLite] Web store initialized');
    }
  }

  // Inicialización de la base de datos SQLite
  async initDB() {
    try {
      if (Capacitor.getPlatform() !== 'web') {
        // Solo usa SQLite en plataformas nativas
        this.db = await this.sqlite.createConnection('offlineDB', false, 'no-encryption', 1, false);
        await this.db.open();
        await this.db.execute(`
          CREATE TABLE IF NOT EXISTS pending_submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            payload TEXT NOT NULL,
            synced INTEGER DEFAULT 0
          );
        `);
        console.log('[SQLite] Local DB ready');
      } else {
        // En la web, no puedes usar SQLite, por lo que implementas un fallback (localStorage)
        console.log('[SQLite] Web platform detected. Using localStorage as fallback.');
      }
    } catch (error) {
      console.error('[SQLite] DB Init Error:', error);
    }
  }

  // Guardar datos en la base de datos (SQLite o fallback en Web)
  async saveOffline(data: any) {
    if (!this.db) {
      console.warn('[SQLite] DB not initialized');
      return;
    }

    try {
      if (Capacitor.getPlatform() === 'web') {
        // Para la web, usamos localStorage como alternativa
        localStorage.setItem('pending_submission', JSON.stringify(data));
        console.log('[SQLite] Data saved to LocalStorage (Web)');
      } else {
        // En plataformas nativas (iOS/Android) usamos SQLite
        await this.db.run('INSERT INTO pending_submissions (payload, synced) VALUES (?, 0)', [JSON.stringify(data)]);
        console.log('[SQLite] Data saved locally');
      }
    } catch (error) {
      console.error('[SQLite] Save error:', error);
    }
  }

  // Sincronizar datos pendientes cuando hay conexión
  async syncPendingSubmissions() {
    if (!this.db) return;

    const net = await Network.getStatus();
    if (!net.connected) {
      console.log('[Sync] No internet connection');
      return;
    }

    try {
      const res = await this.db.query('SELECT * FROM pending_submissions WHERE synced = 0');
      if (!res.values || res.values.length === 0) {
        console.log('[Sync] No pending submissions');
        return;
      }

      for (const item of res.values) {
        const payload = JSON.parse(item.payload);
        try {
          await this.http.post('https://iabot.com.co/api_service.php', payload).toPromise();
          await this.db.run('UPDATE pending_submissions SET synced = 1 WHERE id = ?', [item.id]);
          console.log(`[Sync] ID ${item.id} synced`);
        } catch (error) {
          console.error(`[Sync] Failed to sync ID ${item.id}:`, error);
        }
      }
    } catch (error) {
      console.error('[Sync] Query error:', error);
    }
  }

  // Establecer listener para detectar cambios de red
  private setupNetworkSync() {
    Network.addListener('networkStatusChange', status => {
      if (status.connected) {
        console.log('[Network] Connection restored, syncing...');
        this.syncPendingSubmissions();
      }
    });
  }

  // Cerrar la conexión a la base de datos
  async closeConnection() {
    try {
      if (this.db) {
        await this.db.close();
        console.log('[SQLite] Database connection closed');
      }
    } catch (error) {
      console.error('[SQLite] Close connection error:', error);
    }
  }
}
