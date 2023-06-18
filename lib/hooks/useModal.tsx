import { useContext } from 'react'
import { ModalsContext } from 'lib/context'
import { ModalsContextType } from 'lib/types';

export const useModal = <N extends string = string, P extends object = Record<string, any>>() => {
  const modalsContext = useContext(ModalsContext);

  if (!Object.keys(modalsContext).length) {
    console.error('Context isn\'t provided');

    return {
      showModal: () => null,
      closeModal: () => null,
    }
  }

  return modalsContext as Required<ModalsContextType<N, P>>;
};
