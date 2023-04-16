import { createContext, Context as ReactContext } from 'react';
import { ModalsContextType } from 'types';

const Context: ReactContext<Partial<ModalsContextType>> = createContext({});

export default Context;