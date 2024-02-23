import { useEffect, useState } from "react";
import AppHeader from "../app-header/AppHeader.tsx";
import BurgerConstructor from "../burger-constructor/BurgerConstructor.tsx";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients.tsx";
import appStyles from "./App.module.css";
import { ApiData } from "../../ApiData.types.ts";
import Container from "../container/Container.tsx";
import Col from "../col/Col.tsx";

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

  const errorMessage = <>Something wrong, try later</>;
  return (
    <div>
      {/* // for debug
       <Container>
        <div className={commonStyles.col2} style={{ background: "blue" }}>
          <p>Contents of first col</p>
        </div>
        <div className={commonStyles.col3} style={{ background: "red" }}>
          <p>Contents of second col</p>
        </div>
        <div className={commonStyles.col1} style={{ background: "green" }}>
          <p>Contents of third col</p>
        </div>
        <div className={commonStyles.col5} style={{ background: "purple" }}>
          <p>Contents of fourth col</p>
        </div>
        <div className={commonStyles.col6} style={{ background: "orange" }}>
          <p>Contents of fifth col</p>
        </div>
      </Container> */}

      <Container extraClass={appStyles.center}>
        <Col w={6}>
          <AppHeader />
        </Col>
        <Col w={6}>
          {data.length > 0 && (
            <Container extraClass={appStyles.center}>
              <Col w={3} extraClass={appStyles.center}>
                <BurgerIngredients data={data} />
              </Col>

              <Col w={3} extraClass={appStyles.center + " pl-10"}>
                <BurgerConstructor data={data} />
              </Col>
            </Container>
          )}
          {(!data || data.length === 0) && errorMessage}
        </Col>
      </Container>
    </div>
  );
};

export default App;
