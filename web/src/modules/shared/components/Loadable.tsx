import React, { Suspense } from 'react';

import {Loader} from './Loader';

export const Loadable = (Component: React.ComponentType<any>) => (props: React.PropsWithChildren) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );