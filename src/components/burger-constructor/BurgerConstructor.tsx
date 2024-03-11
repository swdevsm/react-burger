import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import { useEffect, useMemo, useReducer, useRef } from "react";
import useModal from "../../hooks/modal.hook";
import OrderDetails from "../order-details/OrderDetails";
import Container from "../container/Container";
import Col from "../col/Col";
import styles from "../../index.module.css";
import { TotalAction, TotalState } from "./BurgerConstructor.types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addIngredient,
  moveIngredient,
  removeIngredient,
  selectSelectedBun,
  selectSelectedIngredients,
} from "../../services/burgerConstructor";
import { selectIngredients } from "../../services/ingredients";
import { createOrderRequest, selectOrder } from "../../services/order";
import { ApiData } from "../../ApiData.types";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";

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

interface DraggableItemProps {
  ingredient: ApiData;
  index: number;
}

const DraggableItem = ({ ingredient, index }: DraggableItemProps) => {
  const dispatch = useAppDispatch();
  const handleRemoveElement = (index: number) => {
    dispatch(removeIngredient(index));
  };
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "constructor",
    item: () => {
      return { id: ingredient._id, index };
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} data-handler-id={handlerId}>
      <Container extraClass={styles.center + " pt-4"}>
        <div className={styles.align}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          isLocked={false}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => handleRemoveElement(index)}
        />
      </Container>
    </div>
  );
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const BurgerConstructor = () => {
  const data = useAppSelector(selectIngredients);
  const selectedIngredients = useAppSelector(selectSelectedIngredients);
  const selectedBun = useAppSelector(selectSelectedBun);

  const order = useAppSelector(selectOrder);
  const dispatch = useAppDispatch();

  const onDropHandler = (itemId: string) => {
    const ingredient = data?.find((v) => v._id === itemId);
    if (ingredient) {
      dispatch(
        addIngredient({ uniqueId: self.crypto.randomUUID(), ingredient })
      );
    } else {
      throw Error(`wrong ingredient id: ${itemId}`);
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId: { id: string }) {
      onDropHandler(itemId.id);
    },
  });

  // todo: call dispatcher on dnd actions
  const [total, totalDispatcher] = useReducer(totalReducer, initialState);
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
    if (selectedBun) {
      const buns = selectedBun.price * 2;
      const ingredientsPrice = selectedIngredients
        .map((value) => value.ingredient.price)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      return ingredientsPrice + buns;
    } else {
      return 0;
    }
  }, [selectedBun, selectedIngredients]);

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

  const handleCreateOrderClick = async () => {
    if (selectedBun) {
      const ids = [
        selectedBun._id,
        ...selectedIngredients.map((value) => value.ingredient._id),
        selectedBun._id,
      ];
      dispatch(createOrderRequest(ids));
      toggleOpen();
    } else {
      throw Error("select bun first");
    }
  };

  return (
    <div ref={dropTarget}>
      <Container extraClass={styles.center + " pt-25"}>
        <Col w={6}>
          <Container extraClass={`${styles.center}`}>
            <div className={burgerConstructorStyles.emptyDragIcon} />
            {selectedBun && (
              <ConstructorElement
                key={selectedBun._id}
                type="top"
                isLocked={true}
                text={`${selectedBun.name} (верх)`}
                price={selectedBun.price}
                thumbnail={selectedBun.image}
              />
            )}
          </Container>
        </Col>

        <Container>
          <ul className={styles.scroll}>
            {selectedIngredients.map((value, index) => (
              <li key={value.uniqueId}>
                <DraggableItem ingredient={value.ingredient} index={index} />
              </li>
            ))}
          </ul>
        </Container>

        <Col w={6}>
          <Container extraClass={`${styles.center} pt-4`}>
            <div className={burgerConstructorStyles.emptyDragIcon} />
            {selectedBun && (
              <ConstructorElement
                key={selectedBun._id}
                type={"bottom"}
                isLocked={true}
                text={`${selectedBun.name} (низ)`}
                price={selectedBun.price}
                thumbnail={selectedBun.image}
              />
            )}
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
    </div>
  );
};

export default BurgerConstructor;
