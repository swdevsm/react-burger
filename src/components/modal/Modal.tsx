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
  }, []);

  return ReactDOM.createPortal(
    <div className={modalStyles.box}>
      <div className={modalStyles.header + " pt-10 pl-10 pr-10"}>
        {header && (
          <p className={modalStyles.headerText + " text text_type_main-medium"}>
            {header}
          </p>
        )}
        <div className={modalStyles.headerIcon}>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
      </div>
      <div>{children}</div>
      <ModalOverlay onClick={onClose} />
    </div>,
    modalRoot
  );
};

export default Modal;
