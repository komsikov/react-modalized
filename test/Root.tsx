import React, {PureComponent} from 'react'
import {withModal} from 'lib'
import {ModalList, ModalsProps} from 'types'


type Props = {
  modals: ModalList,
} & ModalsProps

const modalContent = 'ContentContent ContentContentContentContent ContentContentContentContent ContentContentContent'

const ContentComponent = withModal()((props: Props) => (
  <div>
    <button
      className="btn-open"
      onClick={() => props.showModal('TEST_MODAL', {title: 'Test modal', content: modalContent})}
    >
      Show me modal
    </button>
  </div>
))

export class Root extends PureComponent<{}, {}> {
  render() {
    return <ContentComponent />
  }
}
