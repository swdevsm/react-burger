import { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIngredients } from "../../services/ingredients";
import {
  clearIngredientsDetails,
  setIngredientsDetails,
} from "../../services/ingredientDetails";
import { addIngredient } from "../../services/burgerConstructor";

const Ingredient = ({ ingredient }: IngredientProps) => {
  const dispatch = useAppDispatch();
  const ingredientDetails = <IngredientDetails ingredient={ingredient} />;
  const { openModal, toggleOpen, modal } = useModal({
    header: "Детали ингредиента",
    details: ingredientDetails,
    onClose: () => {
      dispatch(clearIngredientsDetails());
    },
  });
  return (
    <div>
      <div
        onClick={() => {
          toggleOpen();
          dispatch(setIngredientsDetails(ingredient));
          dispatch(addIngredient(ingredient)); //fixme: remove this action to dnd handler
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
        <Counter count={1} size="default" />
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
  const [currentTab, setCurrentTab] = useState("bun");
  const scrollByTab = (id: string) => {
    const elem = document.getElementById(id);
    elem?.scrollIntoView({ behavior: "smooth" });
  };
  const handleTabClick = (value: string) => {
    setCurrentTab(value);
    scrollByTab(value);
  };
  return (
    <Container>
      <Col w={6}>
        <p className="text text_type_main-large pt-10">Соберите бургер</p>

        <Container extraClass={styles.center + " pt-5"}>
          <Col w={2}>
            <Tab
              value="bun"
              active={currentTab === "bun"}
              onClick={handleTabClick}
            >
              Булки
            </Tab>
          </Col>

          <Col w={2}>
            <Tab
              value="sauce"
              active={currentTab === "sauce"}
              onClick={handleTabClick}
            >
              Соусы
            </Tab>
          </Col>

          <Col w={2}>
            <Tab
              value="main"
              active={currentTab === "main"}
              onClick={handleTabClick}
            >
              Начинки
            </Tab>
          </Col>
        </Container>

        <Container>
          <Col w={6}>
            <Container extraClass={styles.scroll}>
              <ul>
                <li>
                  <IngredientsCategory
                    title="Булки"
                    type="bun"
                    data={data ?? []}
                  />
                </li>
                <li>
                  <IngredientsCategory
                    title="Соусы"
                    type="sauce"
                    data={data ?? []}
                  />
                </li>
                <li>
                  <IngredientsCategory
                    title="Начинки"
                    type="main"
                    data={data ?? []}
                  />
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
