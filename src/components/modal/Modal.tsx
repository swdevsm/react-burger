import { ModalProps } from "./Modal.types";
import ReactDOM from "react-dom";
import modalStyles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import { useEffect } from "react";
import Col from "../col/Col";
import Container from "../container/Container";

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

  const modalElement = (
    <Container>
      <div className={modalStyles.box}>
        <Col w={6}>
          <Container extraClass="pt-10 pl-10 pr-10">
            {/* <Col w={4}> */}
              {header && (
                <p className={"text text_type_main-large"}>{header}</p>
              )}
            {/* </Col> */}

            {/* <Col w={1}> */}
              <Container extraClass={modalStyles.headerIcon}>
                <CloseIcon type="primary" onClick={onClose} />
              </Container>
            {/* </Col> */}
          </Container>
        </Col>

        <Col w={6}>{children}</Col>
      </div>
      <ModalOverlay onClick={onClose} />
    </Container>
  );

  return ReactDOM.createPortal(modalElement, modalRoot);
};

export default Modal;
