import React, { Component, CSSProperties, PropsWithChildren } from 'react'
import { ModalsContext } from 'lib/ModalsContext'
import { ModalProps, RefType, ModalsProviderImpl, State, Props } from 'types'

type ModalsContainerProps = {
  styles: CSSProperties,
  modalNode: RefType,
}

const ModalsContainer = ({ children, styles, modalNode }: PropsWithChildren<ModalsContainerProps>) => (
  <div ref={modalNode} style={styles}>{children}</div>
)

const modalsProviderStyles: { [key: string]: CSSProperties } = {
  style: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    maxHeight: '100vh',
    zIndex: 10,
  },
}

export class ModalsProvider extends Component<PropsWithChildren<Props>, State> implements ModalsProviderImpl {
  modalNode: RefType = React.createRef()
  state: State
  
  constructor(props: Props) {
    super(props)
    
    this.state = {
      modals: Object.keys(props.modals).reduce((a, modal) => Object.assign({[modal]: false}, a), {}),
      modalsProps: {},
    }
  }

  showModal = (modal: string, modalProps: ModalProps) => {
    if (!this.props.modals[modal]) {
      return console.error(`No modal whith name: ${modal}!`)
    }
    
    this.setState((prevState: State) => ({
      modals: {
        ...prevState.modals,
        [modal]: true,
      },
      modalsProps: {
        ...prevState.modalsProps,
        [modal]: modalProps,
      }
    }))

    document.addEventListener('click', this.handleOutsideClick, true)
  }

  closeModal = (modal: string) => {
    if (!this.props.modals[modal]) {
      console.warn(`no modal whith name: ${modal}!`)
      return
    }
    
    this.setState((prevState: State) => ({
      modals: {
        ...prevState.modals,
        [modal]: false,
      },
      modalsProps: {
        ...prevState.modalsProps,
        [modal]: undefined,
      }
    }))

    document.removeEventListener('click', this.handleOutsideClick, false)
  }

  resetModals = () => {
    this.setState({
      modals: Object.keys(this.props.modals).reduce((a, modal) => Object.assign({[modal]: false}, a), {}),
      modalsProps: {},
    })
    
    document.removeEventListener('click', this.handleOutsideClick, false)
  }

  handleOutsideClick = (e: Event) => {
    // @ts-ignore
    if (this.modalNode.current && !this.modalNode.current.contains(e.target)) {
      this.resetModals()
    }

    if (this.modalNode.current === e.target) {
      this.resetModals()
    }
  }

  providerValue = () => ({
    showModal: this.showModal, closeModal: this.closeModal
  });

  render() {
    return(
      <ModalsContext.Provider
        value={this.providerValue()}
      >
        {this.props.children}
        <div id="modals-root">
          {
            Object.keys(this.state.modals).find(m => this.state.modals[m]) && (
              <ModalsContainer styles={modalsProviderStyles.style} modalNode={this.modalNode}>
                {
                  Object.keys(this.props.modals).map((modal, i) => {
                    const Modal = this.props.modals[modal]
                    const {modalsProps, modals} = this.state
                    
                    return modals[modal]
                      ? <Modal key={modal} {...modalsProps[modal]} closeModal={() => this.closeModal(modal)} />
                      : null
                  })
                }
              </ModalsContainer>
            )
          }
        </div>
      </ModalsContext.Provider>
    )
  }
}
