import { useParams } from "react-router-dom";

const IngredientPage = () => {
  const { id } = useParams<"id">();
  return <>{`ingredient ${id}`}</>;
};

export default IngredientPage;
