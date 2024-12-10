import React from "react";
import styles from "./modal.module.css";

const Modal = ({ setOpen, children }) => {
  return (
    <div className={styles.modal} onClick={() => setOpen(false)}>
      <div className={styles.content_wrapper} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
