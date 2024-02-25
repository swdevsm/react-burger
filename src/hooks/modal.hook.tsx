import { ReactNode, useState } from "react";
import Modal from "../components/modal/Modal";

interface ModalHookProps {
  header?: string;
  details: ReactNode;
}

const useModal = ({ header, details }: ModalHookProps) => {
  const [openModal, setOpenModal] = useState(false);
  const toggleOpen = () => {
    setOpenModal(!openModal);
  };
  const modal = (
    <Modal header={header} onClose={toggleOpen}>
      {details}
    </Modal>
  );
  return { openModal, toggleOpen, modal };
};

export default useModal;
