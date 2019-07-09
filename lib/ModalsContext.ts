import {createContext, Context} from 'react'


// tslint:disable:no-any
export type ModalProps<P = any> = {[key: string]: P}
// tslint:enable:no-any

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
