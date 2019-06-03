import React, {Component, ComponentType, ReactNode} from 'react'
import {ModalsContext} from './ModalsContext'
import cn from 'classnames'
import style from './ModalProvider.module.styl'

export type ModalList = {[key: string]: ComponentType}
export type ModalState = {[key: string]: boolean}

// tslint:disable:no-any
export type ModalProps = {[key: string]: any}
// tslint:enable:no-any

export type RefType = React.RefObject<HTMLDivElement>

type Props = {
  modals: ModalList,
  context?: React.Context<{}>,
}

type State = {
  modals: ModalState,
  modalsProps: ModalProps,
}

interface ModalsProviderImpl {
  modalNode: RefType;
  // constructor(props: Props): void;
  showModal(modal: string, modalProps: ModalProps): void;
  closeModal(modal: string): void;
  resetModals(): void;
  handleOutsideClick(e: Event): void;
  createModalsContainer(): (props: {children: ReactNode}) => React.ReactNode;
}

export class ModalsProvider extends Component<Props, State> implements ModalsProviderImpl {
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
      console.warn(`no modal whith name: ${modal}!`)
      return
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

    document.addEventListener('click', this.handleOutsideClick, false)
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
    // TODO: придумать как не закрывать react-select и react-date-picker, пока костыль
    // @ts-ignore
    if (this.modalNode.current && !this.modalNode.current.contains(e.target)
      // @ts-ignore
      && !e.target.classList.contains('react-select__option')
      // @ts-ignore
      && e.target.parentElement && !e.target.parentElement('.react-calendar__tile')) {
      this.resetModals()
    }
    // @ts-ignore
    if (this.modalNode.current === e.target) {
      this.resetModals()
    }
  }

  createModalsContainer = () => {
    return ({children}: {children: ReactNode}) => (
      // @ts-ignore
      <div ref={this.modalNode} className={cn(style.modalProvider)}>{children}</div>
    )
  }

  render() {
    const Context = this.props.context || ModalsContext
    const ModalsContainer = this.createModalsContainer()

    return(
      <Context.Provider
        value={{
          showModal: this.showModal, closeModal: this.closeModal
        }}
      >
        {this.props.children}
        <div id="modals-root">
          {
            Object.keys(this.state.modals).find(m => this.state.modals[m]) && (
              <ModalsContainer>
                {
                  Object.keys(this.props.modals).map((modal, i) => {
                    const Modal = this.props.modals[modal]
                    const {modalsProps, modals} = this.state
                    
                    return modals[modal]
                      ? <Modal key={i} {...modalsProps[modal]} closeModal={() => this.closeModal(modal)} />
                      : null
                  })
                }
              </ModalsContainer>
            )
          }
        </div>
      </Context.Provider>
    )
  }
}
