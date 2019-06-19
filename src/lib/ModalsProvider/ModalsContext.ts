import {createContext, Context} from 'react'
import {ModalProps} from './ModalsProvider'


export type ModalsContextType = {
  showModal?: (modal: string, modalProps: ModalProps) => void
  closeModal?: (modal: string) => void
}

// @ts-ignore
const ModalsContext: Context<ModalsContextType> = createContext({
  showModal: undefined,
  closeModal: undefined,
})

export {ModalsContext}
