import { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  header?: string;
  onClose: () => void;
}
