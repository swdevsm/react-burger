import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import { useContext, useState } from "react";
import useModal from "../../hooks/modal.hook";
import OrderDetails from "../order-details/OrderDetails";
import Container from "../container/Container";
import Col from "../col/Col";
import styles from "../../index.module.css";
import { ApiDataContext } from "../../services/apiDataContext";
import { ApiData } from "../../ApiData.types";

const createOrder = async (selectedIngredients: string[]) => {
  const url = "https://norma.nomoreparties.space/api/orders";
  try {
    const res = await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: selectedIngredients,
      }),
    });
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    const json = await res.json();
    return json.success ? json.order?.number : null;
  } catch (e) {
    console.error("There has been a problem with fetch operation:", e);
    return null;
  }
};

const BurgerConstructor = () => {
  const data: Array<ApiData> = useContext(ApiDataContext);
  const [total] = useState(610);
  const [orderNumber, setOrderNumber] = useState(null);
  const [ingredientsList] = useState(["643d69a5c3f7b9001cfa093c"]); // todo: selected list of ingredients
  const { openModal, toggleOpen, modal } = useModal({
    details: (
      <OrderDetails
        order={{
          id: `${orderNumber}`,
          state: "start",
        }}
      />
    ),
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
              onClick={async () => {
                const order = await createOrder(ingredientsList);
                setOrderNumber(order);
                toggleOpen();
              }}
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
