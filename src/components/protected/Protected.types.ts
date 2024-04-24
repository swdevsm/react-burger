import { ReactNode } from "react";

export interface ProtectedProps {
  children: ReactNode;
  anonymous?: boolean;
}
