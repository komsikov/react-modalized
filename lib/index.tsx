import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react'
import { Moxie } from 'moxie'

type ModalsMap = Record<string, HTMLElement>

type ModalsContextValue = {
  showModal: (name: string, props?: Record<string, unknown>) => void
  closeModal: (name: string) => void
  resetModals: () => void
  registerModal: (name: string, element: HTMLElement) => void
}

const ModalsContext = createContext<ModalsContextValue | null>(null)

export const useMoxie = (): ModalsContextValue => {
  const ctx = useContext(ModalsContext)
  if (!ctx) throw new Error('useMoxie must be used within <MoxieProvider>')
  return ctx
}

type ProviderProps = {
  container: HTMLElement | string
  children: React.ReactNode
}

export const MoxieProvider: React.FC<ProviderProps> = ({ container, children }) => {
  const moxieRef = useRef<Moxie | null>(null)
  const modalsRef = useRef<ModalsMap>({})

  const ensureMoxie = useCallback(() => {
    if (!moxieRef.current) {
      moxieRef.current = new Moxie(typeof container === 'string' ? document.querySelector(container)! : container)
    }
    return moxieRef.current
  }, [container])

  const registerModal = useCallback((name: string, element: HTMLElement) => {
    modalsRef.current[name] = element
    ensureMoxie().registerModal(name, element)
  }, [ensureMoxie])

  const showModal = useCallback((name: string, props?: Record<string, unknown>) => {
    ensureMoxie().showModal(name, props)
  }, [ensureMoxie])

  const closeModal = useCallback((name: string) => {
    ensureMoxie().closeModal(name)
  }, [ensureMoxie])

  const resetModals = useCallback(() => {
    ensureMoxie().resetModals()
  }, [ensureMoxie])

  const value = useMemo<ModalsContextValue>(() => ({
    showModal,
    closeModal,
    resetModals,
    registerModal,
  }), [showModal, closeModal, resetModals, registerModal])

  return (
    <ModalsContext.Provider value={value}>
      {children}
    </ModalsContext.Provider>
  )
}

type ModalProps = {
  name: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ name, children }) => {
  const { registerModal } = useMoxie()
  const ref = useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (ref.current) {
      registerModal(name, ref.current)
    }
  }, [name, registerModal])

  return <div ref={ref}>{children}</div>
}

export { ModalsContext }


