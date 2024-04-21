import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Container from "../container/Container";
import Col from "../col/Col";
import styles from "../../index.module.css";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <Container extraClass={styles.center}>
      <Col w={2}>
        <nav>
          <Container extraClass={styles.center}>
            <div className={styles.container + " p-5"}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">
                <Link to={"/"}>Конструктор</Link>
              </p>
            </div>
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
        <div className={`${styles.container} ${styles.right} p-5`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-1">
            <Link to={"/profile"}>Личный кабинет</Link>
          </p>
        </div>
      </Col>
    </Container>
  );
};

export default AppHeader;
