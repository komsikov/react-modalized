# moxie-react

React bindings для библиотеки Moxie.

Пример:

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { MoxieProvider, useMoxie, Modal } from "moxie-react";

const App = () => {
  const { showModal, closeModal } = useMoxie();
  return (
    <>
      <button onClick={() => showModal("TEST")}>Open</button>
      <Modal name="TEST">
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: "rgba(0 0 0 / 40%)",
          }}
        >
          <div style={{ background: "#fff", padding: 24 }}>
            <h2>Test</h2>
            <button onClick={() => closeModal("TEST")}>Close</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const container = document.getElementById("app")!;
createRoot(container).render(
  <MoxieProvider container={container}>
    <App />
  </MoxieProvider>
);
```
