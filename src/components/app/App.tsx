import { useEffect, useState } from "react";
import AppHeader from "../app-header/AppHeader.tsx";
import BurgerConstructor from "../burger-constructor/BurgerConstructor.tsx";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients.tsx";
import appStyles from "./App.module.css";
import { ApiData } from "../../ApiData.types.ts";

const App = () => {
  const [data, setData] = useState<ApiData[]>([]);

  useEffect(function loadDataFromApi() {
    const load = async () => {
      const url = "https://norma.nomoreparties.space/api/ingredients";
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          setData([]);
          // todo: error boundary ?
        }
      } catch (e) {
        setData([]);
        // todo: error boundary ?
      }
    };
    load();
  }, []);

  const errorMessage = <>Something going wrong, try later</>;
  return (
    <div className={appStyles.column}>
      <div className={appStyles.row}>
        <AppHeader />
      </div>
      <div className={appStyles.row}>
        <div className={appStyles.row}>
          <div className={appStyles.row + "pl-10 ml-10"}></div>
          {data.length > 0 ? <BurgerIngredients data={data} /> : errorMessage}
        </div>
        <div className={appStyles.row}>
          {data.length > 0 ? <BurgerConstructor data={data} /> : errorMessage}
        </div>
        <div className={appStyles.row + "pr-10 mr-10"}></div>
      </div>
    </div>
  );
};

export default App;
