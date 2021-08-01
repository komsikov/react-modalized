import React from 'react'
import ReactDOM from 'react-dom'
import { ModalsProvider } from 'lib'
import modals from './modals'
import ClassesExaple from './ClassesExaple'
import HooksExample from './HooksExample'

const ExamplesPage = () => (
  <ModalsProvider modals={modals}>
    <div style={{display: 'flex'}}>
      <ClassesExaple />
      <HooksExample />
    </div>
  </ModalsProvider>
);

ReactDOM.render(
  <ExamplesPage />,
  document.getElementById('lib-examples-root'),
)
