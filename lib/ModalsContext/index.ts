import { createContext, Context } from 'react'

import { ModalsContextType } from 'types'

export const defaultModalsContext: ModalsContextType = {
  showModal: () => null,
  closeModal: () => null,
};

export const ModalsContext: Context<ModalsContextType> = createContext(defaultModalsContext);