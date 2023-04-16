import React, { Suspense, CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import { ModalsProvider } from 'lib'
import modals from './modals'
import ClassesExample from './ClassesExample'
import HooksExample from './HooksExample'

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
          <ClassesExample />
          <HooksExample />
        </div>
      </div>
    </ModalsProvider>
  </Suspense>
);

ReactDOM.render(
  <ExamplesPage />,
  document.getElementById('lib-examples-root'),
)
