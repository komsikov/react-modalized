import { useContext } from 'react'
import { ModalsContext } from 'lib/ModalsContext'
import { ModalsContextType } from 'types';

export const useModal = () => {
  const modalsContext = useContext(ModalsContext);

  if (!Object.keys(modalsContext).length) {
    console.error('Context not provided');

    return {
      showModal: () => null,
      closeModal: () => null,
    }
  }
  
  return modalsContext as Required<ModalsContextType>;
};