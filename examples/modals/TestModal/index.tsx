import React, { CSSProperties } from 'react'
import { ModalsProps } from 'types'

type Props = {
  title: string,
  content: string,
} & ModalsProps

const testModalStyles: CSSProperties = {
  position: 'absolute',
  width: "100%",
  height: '100%',
  background: 'red',
}

const TestModal = ({ title, content, closeModal }: Props) => (
  <div className="test-modal" style={testModalStyles}>
    <h2 className="test-modal__title">{title}</h2>
    <p>{content}</p>
    <input type="text" />
    <div className="test-modal__btn-group">
      <button className="btn-send" onClick={() => closeModal()}>Send</button>
      <button className="btn-no" onClick={() => closeModal()}>Close</button>
    </div>
  </div>
);

export default TestModal;