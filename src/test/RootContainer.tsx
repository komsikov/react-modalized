import React, {PureComponent} from 'react'
import {ModalsProvider, ModalList} from '../lib'
import {modals} from './_modals'


type Props = {
  modals: ModalList,
}

const ContentComponent = (props: Props) => (
  <div>
    <ModalsProvider modals={props.modals}>
      <div onClick={() => null} >
        Hello
      </div>
    </ModalsProvider>
  </div>
)

export class RootComponent extends PureComponent<{}, {}> {
  render() {
    return <ContentComponent modals={modals} />
  }
}
