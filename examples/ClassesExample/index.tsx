import React from 'react'
import {withModal} from 'lib'
import {ModalList, ModalsProps} from 'types'


type Props = {
  modals: ModalList,
} & ModalsProps

const modalContent = 'ContentContent ContentContentContentContent ContentContentContentContent ContentContentContent'

const ClassesExample = withModal()(({ showModal }: Props) => (
  <div>
    <button
      className="btn-open"
      onClick={() => showModal('TEST_MODAL', { title: 'Hocs modal', content: modalContent })}
    >
      classes based modal
    </button>
  </div>
))

export default ClassesExample;
