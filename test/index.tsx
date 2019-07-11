import React from 'react'
import ReactDOM from 'react-dom'
import {ModalsProvider} from 'lib'
import {modals} from './modals'
import {Root} from './Root'


ReactDOM.render((
  <ModalsProvider modals={modals}>
    <Root />
  </ModalsProvider>
),
document.getElementById('lib-test-root'))
