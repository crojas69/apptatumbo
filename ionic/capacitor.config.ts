import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gymshark.ecommerce',
  appName: 'GymsharkEcommerce',
  webDir: '../public/dist/ionic',
  server: {
    url: 'http://192.168.0.112:8080',
  },
};

export default config;
