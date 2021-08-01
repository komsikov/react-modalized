import { useContext } from 'react'
import { ModalsContext } from 'lib/ModalsContext'

export const useModal = () => {
  const modalsContext = useContext(ModalsContext);

  if (!Object.keys(modalsContext).length) {
    console.error('Context not provided');
  }
  
  return modalsContext;
};