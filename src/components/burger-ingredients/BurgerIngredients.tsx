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

const Ingredient = ({ ingredient }: IngredientProps) => (
  <div className={burgerIngredientsStyles.ingredient + " pt-8 pl-4"}>
    <img src={ingredient.image} />
    <div className="pt-1">
      <p className="text text_type_digits-default pr-1">{ingredient.price}</p>
      <CurrencyIcon type="primary" />
    </div>
    <p className="text text_type_main-default pt-1">{ingredient.name}</p>
  </div>
);

const IngredientsCategory = ({
  title,
  type,
  data,
}: IngredientsCategoryProps) => {
  const filtered = data.filter((value) => value.type === type);
  return (
    <div className={burgerIngredientsStyles.box + " p-10"}>
      <p className="text text_type_main-medium">{title}</p>
      <div className={burgerIngredientsStyles.ingredients}>
        {filtered.map((value) => (
          <Ingredient ingredient={value} />
        ))}
      </div>
    </div>
  );
};

const BurgerIngredients = ({ data }: BurgerIngredientsProps) => {
  const [current, setCurrent] = useState("bun");
  return (
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
      <IngredientsCategory title="Булки" type="bun" data={data} />
      <IngredientsCategory title="Соусы" type="sauce" data={data} />
      <IngredientsCategory title="Начинки" type="main" data={data} />
    </div>
  );
};

export default BurgerIngredients;
