import { createContext, Context } from 'react';
import { ModalsContextType } from 'types';

export const ModalsContext: Context<Partial<ModalsContextType>> = createContext({});