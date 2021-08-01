import React, { ElementType, ReactNode } from 'react'

export type ModalProps<P = any> = {[key: string]: P}

export type ModalsContextType = {
  showModal: (modal: string, modalProps: ModalProps) => void
  closeModal: (modal?: string) => void
}

export type ModalList = {[key: string]: ElementType}

export type ModalState = {[key: string]: boolean}

export type RefType = React.RefObject<HTMLDivElement>

export type Props = { modals: ModalList }

export type State = {
  modals: ModalState,
  modalsProps: ModalProps,
}

interface ModalsProviderImpl {
  modalNode: RefType;
  showModal(modal: string, modalProps: ModalProps): void;
  closeModal(modal: string): void;
  resetModals(): void;
  handleOutsideClick(e: Event): void;
}

export type ModalsProps = {
  showModal: (modal: string, modalProps: ModalProps) => void
  closeModal: (modal?: string) => void
}
  
export type WithModalConfig = {
  showModalCustomName?: string,
  closeModalCustomName?: string,
}