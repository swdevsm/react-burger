import { useState } from "react";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import {
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

const Ingredient = ({ ingredient }: IngredientProps) => {
  const ingredientDetails = <IngredientDetails ingredient={ingredient} />;
  const { openModal, toggleOpen, modal } = useModal({
    header: "Детали ингредиента",
    details: ingredientDetails,
  });
  return (
    <div
      className={burgerIngredientsStyles.ingredient + " pt-8 pl-4"}
      onClick={toggleOpen}
    >
      <img src={ingredient.image} />
      <div className="pt-1">
        <p className="text text_type_digits-default pr-1">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default pt-1">{ingredient.name}</p>
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
    <div className={burgerIngredientsStyles.categoryBox + " p-10"}>
      <p className="text text_type_main-medium">{title}</p>
      <div className={burgerIngredientsStyles.ingredients}>
        {filtered.map((value) => (
          <Ingredient key={value._id} ingredient={value} />
        ))}
      </div>
    </div>
  );
};

const BurgerIngredients = ({ data }: BurgerIngredientsProps) => {
  const [current, setCurrent] = useState("bun");
  return (
    <div className={burgerIngredientsStyles.column}>
      <div className={burgerIngredientsStyles.box}>
        <p className="text text_type_main-large pt-10">Соберите бургер</p>
        <div className="pt-5">
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
      </div>
      <div className={burgerIngredientsStyles.scroll}>
        <IngredientsCategory title="Булки" type="bun" data={data} />
        <IngredientsCategory title="Соусы" type="sauce" data={data} />
        <IngredientsCategory title="Начинки" type="main" data={data} />
      </div>
    </div>
  );
};

export default BurgerIngredients;
