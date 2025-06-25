import * as dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

export const environment = {
  production: true,
  apiUrl: 'https://tudominio.com/api'  // Para producción
};