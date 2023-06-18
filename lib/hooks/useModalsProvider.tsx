import { useState, useCallback } from 'react'
import {
  Props,
  State,
  ModalList,
  ModalProps,
} from 'lib/types'

const getInitialState = (modals: ModalList) => {
  const initialModals = Object.keys(modals)
    .reduce((acc, modal) => ({ ...acc, [modal]: false }), {});

  return {
    modals: initialModals,
    modalsProps: {},
  };
};

const useModalsProvider = ({ modals }: Props) => {
  const [state, setState] = useState<State>(() => getInitialState(modals));

  const showModal = useCallback((modalKey: string, modalProps: ModalProps) => {
    if (!modals[modalKey]) {
      return console.error(`No modal with name: ${modalKey}!`)
    }

    if (!Object.keys(state.modals).includes(modalKey)) {
      throw new Error(`No modal with name: ${modalKey}!`);
    }

    if (state.modals[modalKey]) {
      // eslint-disable-next-line no-console
      console.error(new Error('Modal already open'));
      return;
    }

    setState((prevState) => ({
      modals: {
        ...prevState.modals,
        [modalKey]: true,
      },
      modalsProps: {
        ...prevState.modalsProps,
        [modalKey]: modalProps,
      }
    }));
  }, [modals, state]);

  const closeModal = useCallback((modalKey: string) => {
    // if (!modals[modal]) {
    //   console.warn(`no modal with name: ${modal}!`)
    //   return
    // }
    if (!Object.keys(state.modals).includes(modalKey)) {
      throw new Error(`No modal with name: ${modalKey}!`);
    }

    // TODO!: МОДАЛКА НЕ ЗАКРЫВАЕТСЯ КОГДА пропсой передается
    // ф-ция в которой используется closeModal
    // if (!state.modals[modalName]) {
    //   // eslint-disable-next-line no-console
    //   console.error(new Error('Modal already close'));
    //   return;
    // }
    
    setState((prevState: State) => ({
      modals: {
        ...prevState.modals,
        [modalKey]: false,
      },
      modalsProps: {
        ...prevState.modalsProps,
        [modalKey]: undefined,
      }
    }))
  }, [modals, state]);

  const resetModals = useCallback(() => {
    setState(() => getInitialState(modals));
  }, [modals]);

  const getState = useCallback(() => state, [state]);

  return {
    showModal, closeModal, resetModals, getState,
  };
}

export { useModalsProvider }