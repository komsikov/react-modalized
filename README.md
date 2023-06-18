# react-modalized

![build](https://img.shields.io/circleci/build/github/kddaddy/react-modalized.svg?style=for-the-badge&token=3a0afc02b172a8595df1cbc17c1bb44b2181b347)
[![CircleCI](https://circleci.com/gh/kddaddy/react-modalized/tree/master.svg?style=svg)](https://circleci.com/gh/kddaddy/react-modalized/tree/master)

Modals system rendering for react applications

![react-modalized](./static/modalize.jpg)

## Getting started

```bash
  npm install react-modalized
```

## Example

```tsx
import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { useModalsProvider, ModalsContext, ModalsRoot } from 'react-modalized';
import { modals } from 'src/components/modals';

const modals = {
  MODAL_NAME: lazy(() => import('./modalName')),
};

const App = () => {
  const {
    showModal, closeModal, resetModals, getState,
  } = useModalsProvider(modals);

  const modalsState = getState();

  return (
    <ModalsContext.Provider
      value={{
        showModal,
        closeModal,
        resetModals,
        getState,
      }}
    >
      <Page />
      <ModalsRoot modalsState={modalsState} modalsSet={modals} />
    </ModalsContext.Provider>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);

root.render(<App />);
```
