import pkgMetadata from '../../package.json';
import appData from '../../app.json';

export const useConfig = () => ({
  app: {
    name: appData.displayName,
    version: pkgMetadata.version,
  },
  apiUrl: process.env['API_URL'] ?? ''
});
