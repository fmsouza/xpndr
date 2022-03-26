import { useContext } from 'react';

import { IntlContext } from './provider';

export const useText = (translations?: Partial<{}>) => {
  const context = useContext(IntlContext);
  if (translations) {
    context.addTranslations(translations);
  }
  return context;
};
