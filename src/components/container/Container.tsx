import { PropsWithChildren } from "react";
import commonStyles from "../../index.module.css";
import { LayoutProps } from "./Layout.types";

const Container = ({
  children,
  extraClass,
}: PropsWithChildren<LayoutProps>) => {
  const innerExtraClass = extraClass ? " " + extraClass : "";
  return (
    <div className={`${commonStyles.container}${innerExtraClass}`}>
      {children}
    </div>
  );
};

export default Container;
