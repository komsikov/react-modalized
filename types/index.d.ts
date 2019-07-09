import React, {Component, ComponentType, ReactNode, CSSProperties} from 'react'


// tslint:disable:no-any
export type ModalProps<P = any> = {[key: string]: P}
// tslint:enable:no-any

export type ModalsContextType = {
  showModal?: (modal: string, modalProps: ModalProps) => void
  closeModal?: (modal: string) => void
}

export type ModalList = {[key: string]: ComponentType}
export type ModalState = {[key: string]: boolean}

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
  showModal(modal: string, modalProps: ModalProps): void;
  closeModal(modal: string): void;
  resetModals(): void;
  handleOutsideClick(e: Event): void;
  createModalsContainer(): (props: {children: ReactNode}) => React.ReactNode;
}

export type ModalsProps = {
  showModal: (modal: string,modalProps: ModalProps) => void
  closeModal: (modal: string) => void
}
  
type WithModalConfig = {
  showModalCustomName?: string,
  closeModalCustomName?: string,
}