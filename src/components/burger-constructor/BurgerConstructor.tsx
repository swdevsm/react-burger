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

const renderBun = (
  type: "top" | "bottom",
  { _id, name, price, image }: ApiData
) => {
  const typeName = type === "top" ? "верх" : "низ";
  const customStyles = type === "top" ? "" : "pt-4";
  return (
    <Container extraClass={`${styles.center} ${customStyles}`}>
      <div className={burgerConstructorStyles.emptyDragIcon} />
      <ConstructorElement
        key={_id}
        type={type}
        isLocked={true}
        text={`${name} (${typeName})`}
        price={price}
        thumbnail={image}
      />
    </Container>
  );
};

const BurgerConstructor = () => {
  const data: Array<ApiData> = useContext(ApiDataContext); // todo: refactor to redux
  const [selectedBun] = useState(
    data?.filter((value) => value.type === "bun")[0] // fixme: change filter to selected bun by dnd ? do not forget update to ingredients list two times
  );
  const [selectedIngredients] = useState(
    data.filter((value) => value.type !== "bun") // fixme: change fiter to selected items after dnd
  );
  const [total] = useState(610); // fixme: calculate state after dnd (after select items)
  const [ingredientsList] = useState(["643d69a5c3f7b9001cfa093c"]); // todo: update to selected list of ingredients
  const [orderNumber, setOrderNumber] = useState(null);
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

  return (
    <Container extraClass={styles.center + " pt-25"}>
      <Col w={6}>{renderBun("top", selectedBun)}</Col>

      <Container>
        <ul className={styles.scroll}>
          {selectedIngredients.map((value) => (
            <li key={value._id}>
              {/* fixme: use uuid as key */}
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

      <Col w={6}>{renderBun("bottom", selectedBun)}</Col>

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
