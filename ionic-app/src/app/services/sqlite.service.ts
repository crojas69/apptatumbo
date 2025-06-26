import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';  // Asegúrate de importar Capacitor

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  private dbName = 'survey_db';
  private sqlite: SQLiteConnection | null = null;  // Inicialización con 'null'
  private isWeb: boolean = false;

  constructor() {
    // Verifica si está en plataforma web o nativa
    if (Capacitor.isNativePlatform()) {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);  // Utiliza CapacitorSQLite en plataformas nativas
    } else {
      this.isWeb = true;  // Marca la plataforma como web
    }
  }

  // Inicializa SQLite para la plataforma web o nativa
  async initDB() {
    try {
      if (this.isWeb) {
        console.log('[SQLite] Web platform detected. SQLite cannot be used in web.');
        // Configuración alternativa para web, por ejemplo, usar LocalStorage o IndexedDB
        return;
      }

      // En plataformas nativas
      if (this.sqlite) { // Asegúrate de que sqlite no sea nulo antes de usarlo
        const db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
        await db.open();
        await db.execute(`
          CREATE TABLE IF NOT EXISTS site_surveys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT
          );
        `);
        console.log('[SQLite] DB initialized');
      } else {
        console.error('[SQLite] SQLite connection is not initialized');
      }
    } catch (error) {
      console.error('[SQLite] DB init error:', error);
    }
  }

  async saveData(data: any) {
    try {
      if (this.isWeb) {
        // Si estamos en una plataforma web, implementa una solución alternativa, como LocalStorage
        localStorage.setItem('site_survey_data', JSON.stringify(data));
        console.log('[SQLite] Data saved to LocalStorage (Web)');
        return;
      }

      // En plataformas nativas
      if (this.sqlite) { // Asegúrate de que sqlite no sea nulo
        const db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
        await db.open();
        const query = `INSERT INTO site_surveys (data) VALUES (?)`;
        await db.run(query, [JSON.stringify(data)]);
        console.log('[SQLite] Data saved');
      } else {
        console.error('[SQLite] SQLite connection is not initialized');
      }
    } catch (error) {
      console.error('[SQLite] Save error:', error);
    }
  }

  async getData(): Promise<any[]> {
    try {
      if (this.isWeb) {
        // Si estamos en la web, obtenemos los datos de LocalStorage
        const data = localStorage.getItem('site_survey_data');
        return data ? [JSON.parse(data)] : []; // Devuelve un array vacío si no hay datos
      }

      // En plataformas nativas
      if (this.sqlite) { // Asegúrate de que sqlite no sea nulo
        const db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
        await db.open();
        const result = await db.query('SELECT * FROM site_surveys');
        return result.values || [];  // Asegura que devuelvas un array vacío en caso de error
      } else {
        console.error('[SQLite] SQLite connection is not initialized');
        return [];
      }
    } catch (error) {
      console.error('[SQLite] Get error:', error);
      return [];  // Retorna un array vacío en caso de error
    }
  }

  async clearDB() {
    try {
      if (this.isWeb) {
        // En Web, podemos limpiar LocalStorage como alternativa
        localStorage.removeItem('site_survey_data');
        console.log('[SQLite] Data cleared from LocalStorage (Web)');
        return;
      }

      // En plataformas nativas
      if (this.sqlite) { // Asegúrate de que sqlite no sea nulo
        const db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
        await db.open();
        await db.close();  // Usa 'close()' en lugar de 'closeConnection()'
        console.log('[SQLite] Database connection closed');
      } else {
        console.error('[SQLite] SQLite connection is not initialized');
      }
    } catch (error) {
      console.error('[SQLite] Clear error:', error);
    }
  }
}
