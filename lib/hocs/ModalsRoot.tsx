import React, { Suspense, useMemo } from 'react';
import { State } from '../types';

type Props = {
  modalsState: State,
  modalsSet: any
};

export const ModalsRoot = ({ modalsState, modalsSet }: Props) => {
  const { modalsProps } = modalsState;

  const modals = useMemo(() => Object.keys(modalsState.modals).map((modalName) => {
    const Modal = modalsSet[modalName];

    return modalsState.modals[modalName] && (
      <Modal
        key={modalName}
        isOpen
        {...modalsProps[modalName]}
      />
    );
  }), [modalsProps, modalsSet, modalsState.modals]);

  return (
    <>
      <Suspense fallback={null}>
        {modals}
      </Suspense>
    </>
  );
};