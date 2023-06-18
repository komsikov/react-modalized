import React, { Suspense, CSSProperties } from 'react'
import { createRoot } from 'react-dom/client';
import { ModalsProvider } from 'lib'
import modals from './modals'
import Page from './page'

const styles: { [key: string]: CSSProperties } = {
  examplePageWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  examplePage: {
    display: 'grid',
    justifyContent: 'center',
    rowGap: '12px',
  }
}

const ExamplesPage = () => (
  <Suspense fallback="loading...">
    <ModalsProvider modals={modals}>
      <div style={styles.examplePageWrapper}>
        <div style={styles.examplePage}>
          <Page />
        </div>
      </div>
    </ModalsProvider>
  </Suspense>
);

const container = document.getElementById('lib-examples-root') as HTMLElement;

const root = createRoot(container);
root.render(<ExamplesPage />);