import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  private dbName = 'survey_db';
  private sqlite: SQLiteConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);  // Crea la instancia de SQLiteConnection correctamente
  }

  async initDB() {
    try {
      // Aquí se pasa el objeto de configuración necesario
      const db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
      await db.open();
      await db.execute(`
        CREATE TABLE IF NOT EXISTS site_surveys (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          data TEXT
        );
      `);
      console.log('[SQLite] DB initialized');
    } catch (error) {
      console.error('[SQLite] DB init error:', error);
    }
  }

  async saveData(data: any) {
    try {
      const db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
      await db.open();
      const query = `INSERT INTO site_surveys (data) VALUES (?)`;
      await db.run(query, [JSON.stringify(data)]);
      console.log('[SQLite] Data saved');
    } catch (error) {
      console.error('[SQLite] Save error:', error);
    }
  }

  async getData(): Promise<any[]> {
    try {
      const db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
      await db.open();
      const result = await db.query('SELECT * FROM site_surveys');
      return result.values || [];  // Garantiza que siempre se devuelva un array vacío en lugar de undefined
    } catch (error) {
      console.error('[SQLite] Get error:', error);
      return [];  // Retorna un array vacío en caso de error
    }
  }
  

  async clearDB() {
    try {
      const db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
      await db.open();
      await db.close();  // Usa 'close()' en lugar de 'closeConnection()'
      console.log('[SQLite] Database connection closed');
    } catch (error) {
      console.error('[SQLite] Clear error:', error);
    }
  }
  
}
