import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'easyimobiliario.com',
  appName: 'easy mobile',
  webDir: 'out',
  bundledWebRuntime: false,
  "server": {
    "url": "https://www.easyimobiliario.com.br",
    "cleartext": true
  }
};


export default config;
