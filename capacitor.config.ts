import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.organizer.angular',
  appName: 'organizer',
  webDir: 'www',
  server: {
    url: 'http://192.168.100.164:4200',
    cleartext: true,
  },
};

export default config;
