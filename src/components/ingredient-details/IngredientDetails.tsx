import { IngredientProps } from "../burger-ingredients/BurgerIngredients.types";
import ingredientDetailsStyles from "./IngredientDetails.module.css";

interface IngredientDetailsItemProps {
  label: string;
  value: number;
}

const IngredientDetailsItem = ({
  label,
  value,
}: IngredientDetailsItemProps) => {
  return (
    <div className={ingredientDetailsStyles.detailsItems + " pl-5"}>
      <div className={ingredientDetailsStyles.detailsItem}>
        <p className="text text_type_main-default text_color_inactive">
          {label}
        </p>
      </div>
      <div className={ingredientDetailsStyles.detailsItem + " pt-2"}>
        <p className="text text_type_digits-default text_color_inactive">
          {value}
        </p>
      </div>
    </div>
  );
};

const IngredientDetails = ({ ingredient }: IngredientProps) => {
  return (
    <div className={ingredientDetailsStyles.box}>
      <img src={ingredient.image_large} />
      <div className={ingredientDetailsStyles.box}>
        <div className={ingredientDetailsStyles.name}>
          <p className="text text_type_main-medium">{ingredient.name}</p>
        </div>
        <div className={ingredientDetailsStyles.details + " pt-8 pb-10 mb-5"}>
          <IngredientDetailsItem
            label="Калории,ккал"
            value={ingredient.calories}
          />
          <IngredientDetailsItem label="Белки, г" value={ingredient.proteins} />
          <IngredientDetailsItem label="Жиры, г" value={ingredient.fat} />
          <IngredientDetailsItem
            label="Углеводы, г"
            value={ingredient.carbohydrates}
          />
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
