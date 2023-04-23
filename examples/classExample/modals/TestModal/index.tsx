import React, { CSSProperties } from 'react'
import { ModalsProps } from 'lib/types'

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
    padding: '40px 32px',
    background: '#9695a1',
  }
}

const TestModal = ({ title, content, closeModal }: Props) => (
  <div style={testModalStyles.testModalOverlay}>
    <div style={testModalStyles.modal}>
      <h2>{title}</h2>
      <p>{content}</p>
      <input type="text" />
      <div>
        <button onClick={() => closeModal()}>Send</button>
        <button onClick={() => closeModal()}>Close</button>
      </div>
    </div>
  </div>
);

export default TestModal;