import React, { CSSProperties } from 'react'
import { useModal } from 'lib'

const modalContent = 'Very large content text Very large content text Very large content text Very large content text Very large content text Very large content text Very large content text Very large content text'

const styles: { [key: string]: CSSProperties } = {
  hooksExampleWrapper: {
    height: 'max-content',
    margin: 'auto',
    display: 'flex',
  },
  btn: {
    border: '1px solid #ffeaea',
    padding: '24px 12px',
    borderRadius: '12px',
    background: '#e4e4ff',
    cursor: 'pointer',
  }
}

const HooksExample = () => {
  const { showModal } = useModal();

  return (
    <div style={styles.hooksExampleWrapper}>
      <button
        style={styles.btn}
        onClick={() => showModal('TEST_MODAL', {
          title: 'Hooks modal',
          content: modalContent,
        })}
      >
        hooks based modal
      </button>
    </div>
  );
};

export default HooksExample;
