import React,{PureComponent} from 'react'
import {ModalsProps} from 'lib'


type Props = ModalsProps & {}

export class TestModal extends PureComponent<Props, {}> {
  render() {
    return (
      <div className="">
        Open modal name
        <input />
        <button onClick={}> Open</button>
      </div>
    )
  }
}
