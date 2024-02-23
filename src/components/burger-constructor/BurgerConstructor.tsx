import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorProps } from "./BurgerConstructor.types";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import { useState } from "react";
import useModal from "../../hooks/modal.hook";

const BurgerConstructor = ({ data }: BurgerConstructorProps) => {
  const [total] = useState(610);
  const totalDetails = <>{total}</>;
  const { openModal, toggleOpen, modal } = useModal({
    details: totalDetails,
  });
  return (
    <div className={burgerConstructorStyles.box + " pt-25"}>
      <div className="pt-4">
        <div className={burgerConstructorStyles.dragIcon + " pr-2"}>
          <div className={burgerConstructorStyles.emptyDragIcon} />
        </div>
        {/* fixme: check lenght */}
        <ConstructorElement
          key={data[0]._id}
          type={"top"}
          isLocked={true}
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>

      <div className={burgerConstructorStyles.list}>
        {data.map((value, index) => {
          return (
            index !== 0 &&
            index !== data.length - 1 && (
              <div className="pt-4">
                <div className={burgerConstructorStyles.dragIcon + " pr-2"}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  key={value._id}
                  isLocked={false}
                  text={value.name}
                  price={value.price}
                  thumbnail={value.image}
                />
              </div>
            )
          );
        })}
      </div>

      <div className="pt-4">
        <div className={burgerConstructorStyles.dragIcon + " pr-2"}>
          <div className={burgerConstructorStyles.emptyDragIcon} />
        </div>
        <ConstructorElement
          key={data[data.length - 1]._id}
          type={"bottom"}
          isLocked={true}
          text={data[data.length - 1].name}
          price={data[data.length - 1].price}
          thumbnail={data[data.length - 1].image}
        />
      </div>

      <div className={burgerConstructorStyles.totalBox + " pt-10"}>
        <div className={burgerConstructorStyles.total}>
          <p className="text text_type_digits-medium">{total}</p>
        </div>
        <div className={burgerConstructorStyles.totalIcon + " pl-4"}>
          <CurrencyIcon type="primary" />
        </div>
        <div className="pl-10">
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={toggleOpen}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {openModal && modal}
    </div>
  );
};

export default BurgerConstructor;
