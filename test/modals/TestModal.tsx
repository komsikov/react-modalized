import React,{PureComponent} from 'react'
import {ModalsProps} from 'types'


type Props = {
  title: string,
  content: string,
} & ModalsProps

export class TestModal extends PureComponent<Props, {}> {
  render() {
    return (
      <div className="test-modal">
        <h2 className="test-modal__title">{this.props.title}</h2>
        <p>{this.props.content}</p>
        <input type="text" />
        <div className="test-modal__btn-group">
          <button className="btn-send" onClick={() => null}>Send</button>
          <button className="btn-no" onClick={() => this.props.closeModal()}>Close</button>
        </div>
      </div>
    )
  }
}
