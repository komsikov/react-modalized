import React, { Suspense, CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import { ModalsProvider } from 'lib'
import modals from './modals'
import ClassesExample from './ClassesExample'
import HooksExample from './HooksExample'

const examplePageStyles: CSSProperties = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column'
}

const ExamplesPage = () => (
  <Suspense fallback="HUI">
    <ModalsProvider modals={modals}>
      <div style={examplePageStyles}>
        <ClassesExample />
        <HooksExample />
      </div>
    </ModalsProvider>
  </Suspense>
);

ReactDOM.render(
  <ExamplesPage />,
  document.getElementById('lib-examples-root'),
)
