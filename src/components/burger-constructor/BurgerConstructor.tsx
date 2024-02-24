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
import styles from "../../index.module.css";

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
  const buns = data.filter((value) => value.type === "bun");
  const top = buns[0]; // no state yet
  const bottom = buns[0]; // no state yet
  const filteredData = data.filter((value) => value.type !== "bun");
  return (
    <Container extraClass={styles.center + " pt-25"}>
      <Col w={6}>
        <Container extraClass={styles.center}>
          <div className={burgerConstructorStyles.emptyDragIcon} />
          <ConstructorElement
            key={top._id}
            type={"top"}
            isLocked={true}
            text={`${top.name} (верх)`}
            price={top.price}
            thumbnail={top.image}
          />
        </Container>
      </Col>

      <Container>
        <ul className={styles.scroll}>
          {filteredData.map((value) => (
            <li key={value._id}>
              <Container extraClass={styles.center + " pt-4"}>
                <div className={styles.align}>
                  <DragIcon type="primary" />
                </div>

                <ConstructorElement
                  isLocked={false}
                  text={value.name}
                  price={value.price}
                  thumbnail={value.image}
                />
              </Container>
            </li>
          ))}
        </ul>
      </Container>

      <Col w={6}>
        <Container extraClass={styles.center + " pt-4"}>
          <div className={burgerConstructorStyles.emptyDragIcon} />
          <ConstructorElement
            key={bottom._id}
            type={"bottom"}
            isLocked={true}
            text={`${bottom.name} (низ)`}
            price={bottom.price}
            thumbnail={bottom.image}
          />
        </Container>
      </Col>

      <Col w={6}>
        <Container extraClass={styles.right + " pt-10"}>
          <p className="text text_type_digits-medium">{total}</p>
          <div className={"pl-4"}>
            <CurrencyIcon type="primary" />
          </div>
          <div className="pl-10 pb-10">
            {/* fixme: refactor to <button> ? */}
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
