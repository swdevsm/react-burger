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
    <div className={appStyles.container}>
      {/* <div className={appStyles.element} id="one"></div> */}
      <div className={appStyles.nav}>
        <AppHeader />
      </div>
      <div className={appStyles.aside}>
        {data.length > 0 ? <BurgerIngredients data={data} /> : errorMessage}
      </div>
      <div className={appStyles.content}>
        {data.length > 0 ? <BurgerConstructor data={data} /> : errorMessage}
      </div>
      {/* <div className={appStyles.section}>Section</div> */}
      {/* <div className={appStyles.footer}>Footer</div> */}
    </div>
  );
};

export default App;
