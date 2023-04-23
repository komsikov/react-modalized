import React, { ElementType } from 'react'

import Context from '../context'
import { ModalProps, ModalsContextType, WithModalConfig } from 'lib/types'


const setConfig = (context: Partial<ModalsContextType>, {
  showModalCustomName = 'showModal',
  closeModalCustomName = 'closeModal',
}: WithModalConfig = {}) => ({
  ...context,
  [showModalCustomName]: context.showModal,
  [closeModalCustomName]: context.closeModal,
})

export const withModal = (config?: WithModalConfig) => (Component: ElementType) => (props: ModalProps) => (
  <Context.Consumer>
    {(context) => (
      <Component
        {...props}
        {...setConfig(context, config)}
      />
    )}
  </Context.Consumer>
)
