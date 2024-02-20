import { ApiData } from "../../ApiData.types";

export interface BurgerIngredientsProps {
  data: Array<ApiData>;
}

export interface IngredientsCategoryProps extends BurgerIngredientsProps {
  title: string;
  type: string;
}

export interface IngredientProps {
  ingredient: ApiData;
}
