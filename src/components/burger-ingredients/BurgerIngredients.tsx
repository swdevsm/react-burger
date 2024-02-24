import { useState } from "react";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIngredientsProps,
  IngredientProps,
  IngredientsCategoryProps,
} from "./BurgerIngredients.types";
import useModal from "../../hooks/modal.hook";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import Container from "../container/Container";
import Col from "../col/Col";

const Ingredient = ({ ingredient }: IngredientProps) => {
  const ingredientDetails = <IngredientDetails ingredient={ingredient} />;
  const { openModal, toggleOpen, modal } = useModal({
    header: "Детали ингредиента",
    details: ingredientDetails,
  });
  return (
    <div>
      <div
        onClick={toggleOpen}
        className={burgerIngredientsStyles.counterParent}
      >
        <Container extraClass={burgerIngredientsStyles.center + " pt-6 pl-4"}>
          <img src={ingredient.image} />

          <Container extraClass={burgerIngredientsStyles.center}>
            <p className="text text_type_digits-default pr-1 pt-1">
              {ingredient.price}
            </p>
            <CurrencyIcon type="primary" />
          </Container>

          <p className="text text_type_main-default pt-1">{ingredient.name}</p>
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
      <Container extraClass={burgerIngredientsStyles.center}>
        <Col w={6}>
          <p className="text text_type_main-medium">{title}</p>
        </Col>
        <ul>
          <Container extraClass={burgerIngredientsStyles.center}>
            {filtered.map((value) => (
              <Col key={value._id} w={3}>
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

const BurgerIngredients = ({ data }: BurgerIngredientsProps) => {
  const [currentTab, setCurrentTab] = useState("bun");
  return (
    <Container>
      <Col w={6}>
        <p className="text text_type_main-large pt-10">Соберите бургер</p>

        <Container extraClass={burgerIngredientsStyles.center + " pt-5"}>
          <Col w={2}>
            <Tab
              value="bun"
              active={currentTab === "bun"}
              onClick={setCurrentTab}
            >
              Булки
            </Tab>
          </Col>

          <Col w={2}>
            <Tab
              value="sauce"
              active={currentTab === "sauce"}
              onClick={setCurrentTab}
            >
              Соусы
            </Tab>
          </Col>

          <Col w={2}>
            <Tab
              value="main"
              active={currentTab === "main"}
              onClick={setCurrentTab}
            >
              Начинки
            </Tab>
          </Col>
        </Container>

        <Container>
          <Col w={6}>
            <Container extraClass={burgerIngredientsStyles.scroll}>
              <ul>
                <li>
                  <IngredientsCategory title="Булки" type="bun" data={data} />
                </li>
                <li>
                  <IngredientsCategory title="Соусы" type="sauce" data={data} />
                </li>
                <li>
                  <IngredientsCategory
                    title="Начинки"
                    type="main"
                    data={data}
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
