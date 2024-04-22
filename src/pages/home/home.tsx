import { useEffect } from "react";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor.tsx";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients.tsx";
import Container from "../../components/container/Container.tsx";
import Col from "../../components/col/Col.tsx";
import styles from "../../index.module.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks.ts";
import { fetchIngredients } from "../../services/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const HomePage = () => {
  const { status } = useAppSelector((state) => state.ingredients);

  const errorMessage = (
    <p className="text text_type_main-medium text_color_inactive">
      Error ... Try to update page
    </p>
  );

  const loadingMessage = (
    <p className="text text_type_main-medium text_color_inactive">
      Loading ... Try to update page
    </p>
  );

  try {
    return (
      <div>
        <Container extraClass={styles.center}>
          <Col w={6}>
            <main>
              {status === "finished" && (
                <DndProvider backend={HTML5Backend}>
                  <Container extraClass={styles.center + " pl-10 pr-10"}>
                    <Col w={3} extraClass={styles.center}>
                      <BurgerIngredients />
                    </Col>

                    <Col w={3} extraClass={styles.center + " pl-10"}>
                      <BurgerConstructor />
                    </Col>
                  </Container>
                </DndProvider>
              )}
              {status === "error" && (
                <Container extraClass={styles.center}>{errorMessage}</Container>
              )}
              {status === "loading" && (
                <Container extraClass={styles.center}>
                  {loadingMessage}
                </Container>
              )}
            </main>
          </Col>
        </Container>
      </div>
    );
  } catch (e) {
    return (
      <section>
        <h1>Что-то пошло не так :(</h1>
        <p>
          В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
        </p>
      </section>
    );
  }
};

export default HomePage;
