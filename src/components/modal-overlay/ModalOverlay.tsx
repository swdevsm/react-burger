import styles from "./ModalOverlay.module.css";
import { ModalOverlayProps } from "./ModalOverlay.types";

const ModalOverlay = ({ onClick }: ModalOverlayProps) => {
  return <div className={styles.box} onClick={onClick}></div>;
};

export default ModalOverlay;
