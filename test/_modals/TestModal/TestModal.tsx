import React,{PureComponent} from 'react'
import {ModalsProps} from '../../../lib'


type Props = ModalsProps & {}

export class TestModal extends PureComponent<Props, {}> {
  render() {
    return (
      <div>
        Open modal name
        <input />
        <button onClick={() => null}>Open</button>
        {/*
        TODO: remove emty string param from close modal */}
        <button onClick={() => this.props.closeModal('')}>Close</button>
      </div>
    )
  }
}
