import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sitesurveys.app',
  appName: 'sitesurveys',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      iosSplashResourceName: 'Default',
      showSpinner: true,
      spinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
