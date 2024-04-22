import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { ApiData } from "../../ApiData.types";
import { fetchIngredients } from "../../services/ingredients";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";

const IngredientPage = () => {
  const { id } = useParams<string>();
  const { data, status } = useAppSelector((state) => state.ingredients);
  const [current, setCurrent] = useState<ApiData | null>(null);

  useEffect(() => {
    if (data && status === "finished") {
      const ingredient = data.find((v) => {
        return v._id === id;
      });
      if (ingredient) {
        setCurrent(ingredient);
      }
    }
  }, [data, id, status]);

  return current && <IngredientDetails ingredient={current} />;
};

export default IngredientPage;
