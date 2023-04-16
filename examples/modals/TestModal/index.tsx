import React, { CSSProperties } from 'react'
import { ModalsProps } from 'types'

type Props = {
  title: string,
  content: string,
} & ModalsProps

const testModalStyles: { [key: string]: CSSProperties } = {
  testModalOverlay: {
    position: 'absolute',
    width: "100%",
    height: '100%',
    background: 'rgba(0 0 0 / 40%)',
  },

  modal: {
    width: '50%',
    height: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    border: '1px solid black',
    borderRadius: '14px',
    padding: '40px 32px'
  }
}

const TestModal = ({ title, content, closeModal }: Props) => (
  <div className="test-modal-overlay" style={testModalStyles.testModalOverlay}>
    <div className="test-modal" style={testModalStyles.modal}>
      <h2 className="test-modal__title">{title}</h2>
      <p>{content}</p>
      <input type="text" />
      <div className="test-modal__btn-group">
        <button className="btn-send" onClick={() => closeModal()}>Send</button>
        <button className="btn-no" onClick={() => closeModal()}>Close</button>
      </div>
    </div>
  </div>
);

export default TestModal;