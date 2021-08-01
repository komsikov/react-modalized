import React from 'react'
import { useModal } from 'lib'

const modalContent = 'ContentContent ContentContentContentContent ContentContentContentContent ContentContentContent'

const HooksExample = (() => {
  const { showModal } = useModal();

  return (
    <div>
      <button
        className="btn-open"
        onClick={() => showModal('TEST_MODAL', { title: 'Hooks modal', content: modalContent })}
      >
        hooks based modal
      </button>
    </div>
  );
});

export default HooksExample;
