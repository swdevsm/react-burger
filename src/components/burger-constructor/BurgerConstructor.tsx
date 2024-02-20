import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorProps } from "./BurgerConstructor.types";
import burgerConstructor from "./BurgerConstructor.module.css";
import { useState } from "react";

const BurgerConstructor = ({ data }: BurgerConstructorProps) => {
  const [total] = useState(610);
  return (
    <div className={burgerConstructor.box + " pt-25"}>
      <div className={burgerConstructor.list}>
        {data.map((value, index) => {
          const type =
            index === 0
              ? "top"
              : index == data.length - 1
              ? "bottom"
              : undefined;
          return (
            <div className="pt-4">
              <div className={burgerConstructor.dragIcon + " pr-2"}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                type={type}
                isLocked={false}
                text={value.name}
                price={value.price}
                thumbnail={value.image}
              />
            </div>
          );
        })}
      </div>
      <div className={burgerConstructor.totalBox + " pt-10"}>
        <div className={burgerConstructor.total}>
          <p className="text text_type_digits-medium">{total}</p>
        </div>
        <div className={burgerConstructor.totalIcon + " pl-4"}>
          <CurrencyIcon type="primary" />
        </div>
        <div className="pl-10">
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;
