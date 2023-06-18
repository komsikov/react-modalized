import { createContext, Context as ReactContext } from 'react';
import { ModalsContextType } from 'lib/types';

export const ModalsContext: ReactContext<Partial<ModalsContextType>> = createContext({});