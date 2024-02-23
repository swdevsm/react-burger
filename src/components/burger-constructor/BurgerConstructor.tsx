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
import OrderDetails from "../order-details/OrderDetails";
import Container from "../container/Container";
import Col from "../col/Col";

const BurgerConstructor = ({ data }: BurgerConstructorProps) => {
  const [total] = useState(610);
  const totalDetails = (
    <OrderDetails
      order={{
        id: "034536",
        state: "start",
      }}
    />
  );
  const { openModal, toggleOpen, modal } = useModal({
    details: totalDetails,
  });
  return (
    <Container extraClass={burgerConstructorStyles.center + " pt-25"}>
      <Col w={6}>
        <Container extraClass={burgerConstructorStyles.center}>
          <div className={burgerConstructorStyles.emptyDragIcon} />
          <ConstructorElement
            key={data[0]._id}
            type={"top"}
            isLocked={true}
            text={data[0].name}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </Container>
      </Col>

      <Container extraClass={burgerConstructorStyles.scroll}>
        {data.map((value, index) => {
          return (
            index !== 0 &&
            index !== data.length - 1 && (
              <Col w={6}>
                <Container
                  extraClass={burgerConstructorStyles.center + " pt-4"}
                >
                  <div className={burgerConstructorStyles.align}>
                    <DragIcon type="primary" />
                  </div>

                  <ConstructorElement
                    key={value._id}
                    isLocked={false}
                    text={value.name}
                    price={value.price}
                    thumbnail={value.image}
                  />
                </Container>
              </Col>
            )
          );
        })}
      </Container>

      <Col w={6}>
        <Container extraClass={burgerConstructorStyles.center + " pt-4"}>
          <div className={burgerConstructorStyles.emptyDragIcon} />
          <ConstructorElement
            key={data[data.length - 1]._id}
            type={"bottom"}
            isLocked={true}
            text={data[data.length - 1].name}
            price={data[data.length - 1].price}
            thumbnail={data[data.length - 1].image}
          />
        </Container>
      </Col>

      <Col w={6}>
        <Container extraClass={burgerConstructorStyles.right + " pt-10"}>
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
        </Container>
      </Col>

      {openModal && modal}
    </Container>
  );
};

export default BurgerConstructor;
