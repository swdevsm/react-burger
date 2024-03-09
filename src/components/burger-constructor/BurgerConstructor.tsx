import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import { useEffect, useMemo, useReducer, useState } from "react";
import useModal from "../../hooks/modal.hook";
import OrderDetails from "../order-details/OrderDetails";
import Container from "../container/Container";
import Col from "../col/Col";
import styles from "../../index.module.css";
import { ApiData } from "../../ApiData.types";
import { TotalAction, TotalState } from "./BurgerConstructor.types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSelectedIngredients } from "../../services/burgerConstructor";
import { selectIngredients } from "../../services/ingredients";
import { createOrderRequest, selectOrder } from "../../services/order";

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
  const data = useAppSelector(selectIngredients);
  const selectedIngredients = useAppSelector(selectSelectedIngredients);
  const order = useAppSelector(selectOrder);
  const dispatch = useAppDispatch();

  const { buns } = useMemo(
    () => ({
      buns: data?.filter((item) => item.type === "bun") ?? [],
    }),
    [data]
  );
  // todo: call dispatcher on dnd actions
  const [total, totalDispatcher] = useReducer(totalReducer, initialState);
  // fixme: change filter to selected bun by dnd ? do not forget update to ingredients list two times
  const [selectedBun, setSelectedBun] = useState<ApiData>(buns[0]);
  // todo: update to selected list of ingredients
  const [ingredientsIdList, setIngredientsIdList] = useState<string[]>([]);
  const { openModal, toggleOpen, modal } = useModal({
    details: (
      <OrderDetails
        order={{
          id: `${order}`,
          state: "start",
        }}
      />
    ),
    onClose: () => {},
  });

  const totalPrice = useMemo(() => {
    const bunPrice = selectedBun.price * 2;
    const ingredientsPrice = selectedIngredients
      .map((value) => value.price)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return bunPrice + ingredientsPrice;
  }, [selectedIngredients, selectedBun]);

  useEffect(() => {
    totalDispatcher({
      type: "clear",
      sum: 0,
    });
    totalDispatcher({
      type: "inc",
      sum: totalPrice,
    });
  }, [totalPrice]);

  useEffect(
    function demoTotalCalculation() {
      const random = (max: number) => {
        return Math.floor(Math.random() * max);
      };
      if (data) {
        setSelectedBun(buns[random(buns.length)]);
        const withBunsList = [selectedBun, ...selectedIngredients, selectedBun];
        setIngredientsIdList(withBunsList.map((value) => value._id));
      }
    },
    [buns, data, selectedBun, selectedIngredients]
  );

  const handleCreateOrderClick = async () => {
    dispatch(createOrderRequest(ingredientsIdList));
    toggleOpen();
  };

  return (
    <Container extraClass={styles.center + " pt-25"}>
      <Col w={6}>
        <Container extraClass={`${styles.center}`}>
          <div className={burgerConstructorStyles.emptyDragIcon} />
          <ConstructorElement
            key={selectedBun._id}
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
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
        <Container extraClass={`${styles.center} pt-4`}>
          <div className={burgerConstructorStyles.emptyDragIcon} />
          <ConstructorElement
            key={selectedBun._id}
            type={"bottom"}
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
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
              onClick={handleCreateOrderClick}
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
