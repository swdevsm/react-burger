import { PropsWithChildren } from "react";
import { LayoutProps } from "../container/Layout.types";
import styles from "../../index.module.css";

const Col = ({ children, extraClass, w }: PropsWithChildren<LayoutProps>) => {
  const innerExtraClass = extraClass ? " " + extraClass : "";
  return (
    <div className={`${styles[`col${w}`]}${innerExtraClass}`}>
      {children}
    </div>
  );
};

export default Col;
