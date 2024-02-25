import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Container from "../container/Container";
import Col from "../col/Col";
import styles from "../../index.module.css";

const AppHeader = () => {
  return (
    <Container extraClass={styles.center}>
      <Col w={2}>
        <nav>
          <Container extraClass={styles.center}>
            <Container extraClass="p-5">
              {/* fixme: refactor to <button> ? */}
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </Container>
            <Container extraClass="p-5 ml-2">
              {/* fixme: refactor to <button> ? */}
              <ListIcon type="secondary" />
              <div className="p-1" />
              <p className="text text_type_main-default text_color_inactive">
                Лента заказов
              </p>
            </Container>
          </Container>
        </nav>
      </Col>

      <Col w={2}>
        <Container extraClass={styles.center + " p-2"}>
          <Logo />
        </Container>
      </Col>

      <Col w={2}>
        <Container extraClass={styles.right + " p-5"}>
          {/* fixme: refactor to <button> ? */}
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-1">
            Личный кабинет
          </p>
        </Container>
      </Col>
    </Container>
  );
};

export default AppHeader;
