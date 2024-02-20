import { data } from "../../utils/data";
import AppHeader from "../app-header/AppHeader.tsx";
import BurgerConstructor from "../burger-constructor/BurgerConstructor.tsx";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients.tsx";
import appStyles from "./App.module.css";

const App = () => {
  return (
    <div className={appStyles.container}>
      {/* <div className={appStyles.element} id="one"></div> */}
      <div className={appStyles.nav}>
        <AppHeader />
      </div>
      <div className={appStyles.aside}>
        <BurgerIngredients data={data} />
      </div>
      <div className={appStyles.content}>
        <BurgerConstructor />
      </div>
      {/* <div className={appStyles.section}>Section</div> */}
      {/* <div className={appStyles.footer}>Footer</div> */}
    </div>
  );
};

export default App;
