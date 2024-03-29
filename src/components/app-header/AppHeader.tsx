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
            <a href="#" className={styles.container + " p-5"}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </a>
            <a href="#" className={styles.container + " p-5 ml-2"}>
              <ListIcon type="secondary" />
              <div className="p-1" />
              <p className="text text_type_main-default text_color_inactive">
                Лента заказов
              </p>
            </a>
          </Container>
        </nav>
      </Col>

      <Col w={2}>
        <Container extraClass={styles.center + " p-2"}>
          <Logo />
        </Container>
      </Col>

      <Col w={2}>
        <a href="#" className={`${styles.container} ${styles.right} p-5`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-1">
            Личный кабинет
          </p>
        </a>
      </Col>
    </Container>
  );
};

export default AppHeader;
