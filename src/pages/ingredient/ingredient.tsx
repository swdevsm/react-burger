import { useParams } from "react-router-dom";

const Ingredient = () => {
  const { id } = useParams<"id">();
  return <>{`ingredient ${id}`}</>;
};

export default Ingredient;
