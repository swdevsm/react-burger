import { PropsWithChildren } from "react";
import styles from "../../index.module.css";
import { LayoutProps } from "./Layout.types";

const Container = ({
  children,
  extraClass,
}: PropsWithChildren<LayoutProps>) => {
  const innerExtraClass = extraClass ? " " + extraClass : "";
  return (
    <div className={`${styles.container}${innerExtraClass}`}>
      {children}
    </div>
  );
};

export default Container;
