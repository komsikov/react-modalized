import { lazy } from 'react';
import { ModalList } from 'lib/types'


const modals: ModalList = {
  TEST_MODAL: lazy(() => import('./TestModal')),
  TEST_MODAL_1: lazy(() => import('./TestModal')),
  TEST_MODAL_2: lazy(() => import('./TestModal')),
}

export default modals;
