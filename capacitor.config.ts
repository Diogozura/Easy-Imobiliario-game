import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'easyimobiliario.com',
  appName: 'easy mobile',
  webDir: 'out',
  bundledWebRuntime: false,
  "server": {
    "url": "http://192.168.0.103:3000",
    "cleartext": true
  }
};


export default config;
