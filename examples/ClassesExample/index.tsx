import React, { CSSProperties, memo } from 'react'
import {withModal} from 'lib'
import {ModalList, ModalsProps} from 'types'


type Props = {
  modals: ModalList,
} & ModalsProps

const modalContent = 'ContentContent ContentContentContentContent ContentContentContentContent ContentContentContent'

const styles: { [key: string]: CSSProperties } = {
  classesExampleWrapper: {
    height: 'max-content',
    margin: 'auto',
  },
  btn: {
    border: '1px solid #ffeaea',
    padding: '24px 12px',
    borderRadius: '12px',
    background: '#e4e4ff',
    cursor: 'pointer',
  }
}

const ClassesExample = ({ showModal }: Props) => {
  console.log('RENDER')
  return (
    <div style={styles.classesExampleWrapper}>
      <button
        style={styles.btn}
        onClick={() => showModal('TEST_MODAL', { title: 'Hocs modal', content: modalContent })}
      >
        classes based modal
      </button>
    </div>
  )
};

export default withModal()(memo(ClassesExample));
