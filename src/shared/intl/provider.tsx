import React, { useMemo, useState } from 'react';
import { Platform, NativeModules } from 'react-native';
import get from 'lodash/get';
import merge from 'lodash/merge';
import i18n, { Scope, TranslateOptions } from 'i18n-js';

import * as defaultTranslations from './translations';

const deviceLocale =
  Platform.OS === 'ios'
    ? get(
        NativeModules,
        ['SettingsManager', 'settings', 'AppleLocale'],
        null,
      ) ||
      get(
        NativeModules,
        ['SettingsManager', 'settings', 'AppleLocale', 0],
        'en',
      ) //iOS 13
    : get(NativeModules, ['I18nManager', 'localeIdentifier'], 'en');

i18n.fallbacks = true;
i18n.translations = defaultTranslations;
i18n.defaultLocale = deviceLocale;

export const IntlContext = React.createContext<{
  addTranslations: (translations: Partial<{}>) => void,
  getText: (scope: Scope, options?: TranslateOptions) => string
  setLocale: (locale: string) => void,
  selectedLocale: { type: string, label: string }
}>({
  addTranslations: () => {},
  getText: () => '',
  setLocale: () => {},
  selectedLocale: { type: '', label: '' }
});

export const IntlProvider = ({ ...props }) => {
  const [locale, setLocale] = useState(i18n.locale);

  const intlContext = useMemo(() => {
    const getText = (scope: Scope, options?: TranslateOptions) => i18n.t(scope, { locale, ...options });
    const addTranslations = (translations: Partial<{}>) => {
      i18n.translations = merge({ ...i18n.translations }, { ...translations });
    };

    const selectedLocale = {
      type: locale,
      label: getText(`languages.${locale}`) ?? '<Invalid text>',
    };

    return {
      addTranslations,
      getText,
      setLocale,
      selectedLocale,
    };
  }, [locale]);

  return (
    <IntlContext.Provider value={intlContext} {...props} />
  );
};