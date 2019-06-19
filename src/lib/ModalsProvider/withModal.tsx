import React, {ReactType} from 'react'
import {ModalsContext, ModalsContextType, ModalProps} from './ModalsContext'


export type ModalsProps = {
  showModal: (modal: string,modalProps: ModalProps) => void
  closeModal: (modal: string) => void
}

type WithModalConfig = {
  showModalCustomName?: string,
  closeModalCustomName?: string,
}

const setConfig = (context: ModalsContextType, {
  showModalCustomName = 'showModal',
  closeModalCustomName = 'closeModal',
}: WithModalConfig = {}) => ({
  ...context,
  [showModalCustomName]: context.showModal,
  [closeModalCustomName]: context.closeModal,
})

export const withModal = (config: WithModalConfig) => (Component: ReactType) => (props: ModalProps) => (
  <ModalsContext.Consumer>
    {context => <Component {...props} {...setConfig(context, config)} />}
  </ModalsContext.Consumer>
)
