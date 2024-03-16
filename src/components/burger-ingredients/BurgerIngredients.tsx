import { useEffect, useState } from "react";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  IngredientProps,
  IngredientsCategoryProps,
} from "./BurgerIngredients.types";
import useModal from "../../hooks/modal.hook";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import Container from "../container/Container";
import Col from "../col/Col";
import styles from "../../index.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIngredients } from "../../services/ingredients";
import {
  clearIngredientsDetails,
  setIngredientsDetails,
} from "../../services/ingredientDetails";
import { useDrag } from "react-dnd";
import { selectSelectedIngredients } from "../../services/burgerConstructor";
import { useInView } from "react-intersection-observer";

const Ingredient = ({ ingredient }: IngredientProps) => {
  const dispatch = useAppDispatch();
  const selectedIngredients = useAppSelector(selectSelectedIngredients);
  const [count, setCount] = useState(0);
  const ingredientDetails = <IngredientDetails ingredient={ingredient} />;
  const { openModal, toggleOpen, modal } = useModal({
    header: "Детали ингредиента",
    details: ingredientDetails,
    onClose: () => {
      dispatch(clearIngredientsDetails());
    },
  });
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id },
  });

  useEffect(() => {
    if (selectedIngredients) {
      setCount(
        selectedIngredients.filter((v) => v.ingredient._id === ingredient._id)
          .length
      );
    }
  }, [selectedIngredients, ingredient]);
  return (
    <div ref={dragRef}>
      <div
        onClick={() => {
          toggleOpen();
          dispatch(setIngredientsDetails(ingredient));
        }}
        className={burgerIngredientsStyles.counterParent}
      >
        <Container extraClass={"pt-6 pl-4"}>
          <Col w={6} extraClass={styles.center}>
            <img src={ingredient.image} />

            <Container extraClass={styles.center}>
              <p className="text text_type_digits-default pr-1 pt-1">
                {ingredient.price}
              </p>
              <CurrencyIcon type="primary" />
            </Container>

            <p className="text text_type_main-default pt-1">
              {ingredient.name}
            </p>
          </Col>
        </Container>
        {count > 0 && <Counter count={count} size="default" />}
      </div>
      {openModal && modal}
    </div>
  );
};

const IngredientsCategory = ({
  title,
  type,
  data,
}: IngredientsCategoryProps) => {
  const filtered = data.filter((value) => value.type === type);
  return (
    <Col w={6} extraClass="pt-10">
      <Container extraClass={styles.center}>
        <Col w={6}>
          <p id={type} className="text text_type_main-medium">
            {title}
          </p>
        </Col>
        <ul>
          <Container extraClass={styles.center}>
            {filtered.map((value) => (
              <Col key={value._id} w={1}>
                <li>
                  <Ingredient ingredient={value} />
                </li>
              </Col>
            ))}
          </Container>
        </ul>
      </Container>
    </Col>
  );
};

const BurgerIngredients = () => {
  const data = useAppSelector(selectIngredients);
  const scrollByTab = (id: string) => {
    const elem = document.getElementById(id);
    elem?.scrollIntoView({ behavior: "smooth" });
  };
  const handleTabClick = (value: string) => {
    scrollByTab(value);
  };
  const { ref: ref1, inView: inView1 } = useInView();
  const { ref: ref2, inView: inView2 } = useInView();
  const { ref: ref3, inView: inView3 } = useInView();
  return (
    <Container>
      <Col w={6}>
        <p className="text text_type_main-large pt-10">Соберите бургер</p>

        <Container extraClass={styles.center + " pt-5"}>
          <Col w={2}>
            <Tab value="bun" active={inView1} onClick={handleTabClick}>
              Булки
            </Tab>
          </Col>

          <Col w={2}>
            <Tab value="sauce" active={inView2} onClick={handleTabClick}>
              Соусы
            </Tab>
          </Col>

          <Col w={2}>
            <Tab value="main" active={inView3} onClick={handleTabClick}>
              Начинки
            </Tab>
          </Col>
        </Container>

        <Container>
          <Col w={6}>
            <Container extraClass={styles.scroll}>
              <ul>
                <li>
                  <div ref={ref1}>
                    <IngredientsCategory
                      title="Булки"
                      type="bun"
                      data={data ?? []}
                    />
                  </div>
                </li>
                <li>
                  <div ref={ref2}>
                    <IngredientsCategory
                      title="Соусы"
                      type="sauce"
                      data={data ?? []}
                    />
                  </div>
                </li>
                <li>
                  <div ref={ref3}>
                    <IngredientsCategory
                      title="Начинки"
                      type="main"
                      data={data ?? []}
                    />
                  </div>
                </li>
              </ul>
            </Container>
          </Col>
        </Container>
      </Col>
    </Container>
  );
};

export default BurgerIngredients;
