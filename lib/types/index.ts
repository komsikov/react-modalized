import React, { ElementType } from 'react'

export type ModalProps<P extends object = any> = { [key: string]: P };

export type ModalsContextType<N extends string = string, P extends object = ModalProps> = {
  showModal: (modal: N, modalProps?: P) => void,
  closeModal: (modal: N) => void,
  resetModals: () => void,
  getState: () => State,
};

export type ModalList = {[key: string]: ElementType}

export type ModalState = {[key: string]: boolean}

export type RefType = React.RefObject<HTMLDivElement>

export type Props = { modals: ModalList }

export type State<P extends object = any> = {
  modals: ModalState,
  modalsProps: ModalProps<P>,
};

export interface ModalsProviderImpl {
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
