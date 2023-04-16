import { useContext } from 'react'
import Context from 'lib/context'
import { ModalsContextType } from 'types';

export const useModal = <N extends string = string, P extends object = Record<string, any>>() => {
  const modalsContext = useContext(Context);

  if (!Object.keys(modalsContext).length) {
    console.error('Context isn\'t provided');

    return {
      showModal: () => null,
      closeModal: () => null,
    }
  }

  return modalsContext as Required<ModalsContextType<N, P>>;
};
