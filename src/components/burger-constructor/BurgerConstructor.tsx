import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import { useContext, useEffect, useReducer, useState } from "react";
import useModal from "../../hooks/modal.hook";
import OrderDetails from "../order-details/OrderDetails";
import Container from "../container/Container";
import Col from "../col/Col";
import styles from "../../index.module.css";
import { ApiDataContext } from "../../services/apiDataContext";
import { ApiData } from "../../ApiData.types";
import { TotalAction, TotalState } from "./BurgerConstructor.types";

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

const initialState: TotalState = { sum: 0 };

const totalReducer = (state: TotalState, action: TotalAction): TotalState => {
  switch (action.type) {
    case "inc":
      return { sum: state.sum + action.sum };
    case "dec":
      return { sum: state.sum - action.sum };
    case "clear":
      return initialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};

const BurgerConstructor = () => {
  // todo: call dispatcher on dnd actions
  const [total, totalDispatcher] = useReducer(totalReducer, initialState);
  // todo: refactor to redux
  const data: Array<ApiData> = useContext(ApiDataContext);
  // fixme: change filter to selected bun by dnd ? do not forget update to ingredients list two times
  const [selectedBun, setSelectedBun] = useState<ApiData>(
    data?.filter((value) => value.type === "bun")[0]
  );
  // fixme: change fiter to selected items after dnd
  const [selectedIngredients, setSelectedIngredients] = useState(
    data.filter((value) => value.type !== "bun")
  );
  // todo: update to selected list of ingredients
  const [ingredientsList] = useState(["643d69a5c3f7b9001cfa093c"]);
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

  useEffect(
    function demoTotalCalculation() {
      const random = (max: number) => {
        return Math.floor(Math.random() * max);
      };
      const shuffle = (array: Array<ApiData>) => {
        let currentIndex = array.length,
          randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }
        return array;
      };
      if (data) {
        const buns = data?.filter((value) => value.type === "bun");
        setSelectedBun(buns[random(buns.length)]);
        const ingredients = data.filter((value) => value.type !== "bun");
        const start = random(ingredients.length / 2);
        const end = ingredients.length / 2 + random(ingredients.length / 2) - 1;
        const randomized = shuffle(ingredients.slice(start, end));
        setSelectedIngredients(randomized);
        totalDispatcher({
          type: "clear",
          sum: 100_500,
        });
        totalDispatcher({
          type: "inc",
          sum: randomized
            .map((value) => value.price)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            ),
        });
        totalDispatcher({
          type: "inc",
          sum: selectedBun.price * 2,
        });
      }
    },
    [data, selectedBun]
  );

  const typeBunName = (type: "top" | "bottom") =>
    type === "top" ? "верх" : "низ";
  const customBunStyles = (type: "top" | "bottom") =>
    type === "top" ? "" : "pt-4";

  return (
    <Container extraClass={styles.center + " pt-25"}>
      <Col w={6}>
        <Container extraClass={`${styles.center} ${customBunStyles}`}>
          <div className={burgerConstructorStyles.emptyDragIcon} />
          <ConstructorElement
            key={selectedBun._id}
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (${typeBunName("top")})`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </Container>
      </Col>

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

      <Col w={6}>
        <Container extraClass={`${styles.center} ${customBunStyles}`}>
          <div className={burgerConstructorStyles.emptyDragIcon} />
          <ConstructorElement
            key={selectedBun._id}
            type={"bottom"}
            isLocked={true}
            text={`${selectedBun.name} (${typeBunName("bottom")})`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </Container>
      </Col>

      <Col w={6}>
        <Container extraClass={styles.right + " pt-10"}>
          <p className="text text_type_digits-medium">{total.sum}</p>
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
