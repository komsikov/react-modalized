import React, {PureComponent} from 'react'
import {ModalsProvider, ModalList} from 'lib'
import {modals} from './_modals'


type Props1 = {
  modals: ModalList,
}

const ContentComponent = (props: Props1) => (
  <div>
    <ModalsProvider modals={props.modals}>
      <div onClick={() => null} >
        Hello
      </div>
    </ModalsProvider>
  </div>
)

type Props = {}

export class RootComponent extends PureComponent<Props, {}> {
  render() {
    return <ContentComponent modals={modals} />
  }
}