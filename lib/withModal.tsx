import React, {ReactType} from 'react'

import {ModalsContext} from './ModalsContext'
import {ModalProps, ModalsContextType, WithModalConfig} from 'types'


const setConfig = (context: ModalsContextType, {
  showModalCustomName = 'showModal',
  closeModalCustomName = 'closeModal',
}: WithModalConfig = {}) => ({
  ...context,
  [showModalCustomName]: context.showModal,
  [closeModalCustomName]: context.closeModal,
})

export const withModal = (config?: WithModalConfig) => (Component: ReactType) => (props: ModalProps) => (
  <ModalsContext.Consumer>
    {context => <Component {...props} {...setConfig(context, config)} />}
  </ModalsContext.Consumer>
)
