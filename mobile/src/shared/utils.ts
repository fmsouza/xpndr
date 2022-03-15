import pkgMetadata from '../../package.json';
import appData from '../../app.json';

export const useAppDetails = () => ({
  name: appData.displayName,
  version: pkgMetadata.version
});
