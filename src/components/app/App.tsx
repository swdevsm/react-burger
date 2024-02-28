import { useEffect, useState } from "react";
import AppHeader from "../app-header/AppHeader.tsx";
import BurgerConstructor from "../burger-constructor/BurgerConstructor.tsx";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients.tsx";
import { ApiData } from "../../ApiData.types.ts";
import Container from "../container/Container.tsx";
import Col from "../col/Col.tsx";
import styles from "../../index.module.css";
import { ApiDataContext } from "../../services/apiDataContext.ts";

const App = () => {
  const [data, setData] = useState<ApiData[]>([]);

  useEffect(function loadDataFromApi() {
    const load = async () => {
      const url = "https://norma.nomoreparties.space/api/ingredients";
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network response was not OK");
        }
        const json = await res.json();
        setData(json.success ? json.data : []);
      } catch (e) {
        setData([]);
        console.error("There has been a problem with fetch operation:", e);
      }
    };
    load();
  }, []);

  const errorMessage = (
    <p className="text text_type_main-medium text_color_inactive">
      Loading ... Try to update page
    </p>
  );

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

      <ApiDataContext.Provider value={data}>
        <Container extraClass={styles.center}>
          <Col w={6}>
            <header>
              <AppHeader />
            </header>
          </Col>
          <Col w={6}>
            <main>
              {data.length > 0 && (
                <Container extraClass={styles.center}>
                  <Col w={3} extraClass={styles.center}>
                    <BurgerIngredients />
                  </Col>

                  <Col w={3} extraClass={styles.center + " pl-10"}>
                    <BurgerConstructor />
                  </Col>
                </Container>
              )}
              {(!data || data.length === 0) && (
                <Container extraClass={styles.center}>{errorMessage}</Container>
              )}
            </main>
          </Col>
        </Container>
      </ApiDataContext.Provider>
    </div>
  );
};

export default App;
