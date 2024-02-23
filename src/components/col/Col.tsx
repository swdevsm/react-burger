import { PropsWithChildren } from "react";
import { LayoutProps } from "../container/Layout.types";
import commonStyles from "../../index.module.css";

const Col = ({ children, extraClass, w }: PropsWithChildren<LayoutProps>) => {
  const innerExtraClass = extraClass ? " " + extraClass : "";
  return (
    <div className={`${commonStyles[`col${w}`]}${innerExtraClass}`}>
      {children}
    </div>
  );
};

export default Col;
