import modalOverlayStyles from "./ModalOverlay.module.css";
import { ModalOverlayProps } from "./ModalOverlay.types";

const ModalOverlay = ({ onClick }: ModalOverlayProps) => {
  return <div className={modalOverlayStyles.box} onClick={onClick}></div>;
};

export default ModalOverlay;
