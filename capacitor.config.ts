
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c8c92c595cf14b159d157d2aac2a4e4f',
  appName: 'Pacific NW Fishing Forecast',
  webDir: 'dist',
  server: {
    url: "https://c8c92c59-5cf1-4b15-9d15-7d2aac2a4e4f.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  // Add any additional platform-specific configurations here
  ios: {
    contentInset: 'always'
  },
  android: {
    // Android-specific config
  }
};

export default config;
