import React, {
  FC,
  useRef,
  useMemo,
  useState,
  RefObject,
  useCallback,
  CSSProperties,
} from 'react'
import { ModalsContext } from 'lib/ModalsContext'
import {
  Props,
  State,
  ModalList,
  ModalProps,
} from 'types'
import { useClickOutside } from 'lib/useClickOutside'

type ModalsContainerProps = {
  styles: CSSProperties,
  modalNode: RefObject<HTMLDivElement>,
}

const ModalsContainer: FC<ModalsContainerProps> = ({
  children, styles, modalNode,
}) => (
  <div ref={modalNode} style={styles}>
    {children}
  </div>
)

const getInitialModals = (modals: ModalList) => {
  const modalNames = Object.keys(modals);
    
  return modalNames.reduce((acc, modal) => (
    Object.assign({[modal]: false}, acc)
  ), {});
};

const initialModalsContainerStyles: CSSProperties = {
  width: '100%',
  height: '100%',
  maxHeight: '100vh',
  background: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  zIndex: 10,
};

const useModalsProvider = ({ modals }: Props) => {
  const modalNode = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({
      modals: getInitialModals(modals),
      modalsProps: {},
  });

  useClickOutside(
    modalNode,
    () => resetModals()
  );

  const showModal = useCallback((modal: string, modalProps: ModalProps) => {
    if (!modals[modal]) {
      return console.error(`No modal whith name: ${modal}!`)
    }
    
    setState((prevState: State) => ({
      modals: {
        ...prevState.modals,
        [modal]: true,
      },
      modalsProps: {
        ...prevState.modalsProps,
        [modal]: modalProps,
      }
    }))
  }, [modals]);

  const closeModal = useCallback((modal: string) => {
    if (!modals[modal]) {
      console.warn(`no modal whith name: ${modal}!`)
      return
    }
    
    setState((prevState: State) => ({
      modals: {
        ...prevState.modals,
        [modal]: false,
      },
      modalsProps: {
        ...prevState.modalsProps,
        [modal]: undefined,
      }
    }))
  }, [modals]);

  const resetModals = useCallback(() => {
    setState({
      modals: getInitialModals(modals),
      modalsProps: {},
    })
  }, [modals]);

  const showedModals = useMemo(() => Object.keys(state.modals).find((m) => state.modals[m]) && (
    <ModalsContainer styles={initialModalsContainerStyles} modalNode={modalNode}>
      {
        Object.keys(modals).map((modal, i) => {
          const Modal = state.modals[modal]
          const { modalsProps, modals } = state
          
          return modals[modal] && (
            <Modal
              key={i}
              {...modalsProps[modal]}
              closeModal={() => closeModal(modal)}
            />
          );
        })
      }
    </ModalsContainer>
  ), [modals, state, modalNode, closeModal]);


  const Component: FC = useCallback(({ children }) => (
    <ModalsContext.Provider value={{ showModal, closeModal }}>
      {children}
      <div id="modals-root">
        {showedModals}
      </div>
    </ModalsContext.Provider>
  ), [showedModals]);

  return Component;
}

export { useModalsProvider }
