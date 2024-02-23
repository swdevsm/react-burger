import { ModalProps } from "./Modal.types";
import ReactDOM from "react-dom";
import modalStyles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import { useEffect } from "react";

const modalRoot = document.getElementById("react-modals")!;

const Modal = ({ children, header, onClose }: ModalProps) => {
  const escFunction = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };
  useEffect(function handleEscKey() {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div className={modalStyles.box}>
        <div className={modalStyles.header + " pt-10 pl-10 pr-10"}>
          {header && (
            <p
              className={modalStyles.headerText + " text text_type_main-large"}
            >
              {header}
            </p>
          )}
          <div className={modalStyles.headerIcon}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        <div className={modalStyles.children}>{children}</div>
      </div>
      <ModalOverlay onClick={onClose} />
    </div>,
    modalRoot
  );
};

export default Modal;
