import React, { Suspense } from 'react';

import Routes from '../src/components/routing/Routes';

const App = () => {
  return (
    <Suspense fallback={<div>...</div>}>
      <Routes />
    </Suspense>
  );
};

export default App;
