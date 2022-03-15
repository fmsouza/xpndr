import { useText as useGetText } from '~/shared/intl';

import * as en from './en';
import * as pt from './pt';

export const useText = () => useGetText({ en, pt });
