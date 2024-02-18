// import { data } from "../../utils/data"; // todo: use when state will be implemented
import AppHeader from "../app-header/AppHeader.tsx";
import BurgerConstructor from "../burger-constructor/BurgerConstructor.tsx";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients.tsx";

const App = () => {

  return (
    <>
      <AppHeader />
      <hr/>
      <BurgerConstructor />
      <hr/>
      <BurgerIngredients />
      <hr/>
    </>
  );
};

export default App;
