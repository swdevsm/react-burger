import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Container from "../container/Container";
import Col from "../col/Col";
import styles from "../../index.module.css";
import { Link, useLocation } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();

  const inactive = "text_color_inactive";
  return (
    <header>
      <Container extraClass={styles.center}>
        <Col w={2}>
          <nav>
            <Container extraClass={styles.center}>
              <div className={styles.container + " p-5"}>
                <BurgerIcon type="primary" />
                <p
                  className={`text text_type_main-default pl-2 ${
                    location.pathname === "/" ? "" : inactive
                  }`}
                >
                  <Link to={"/"}>Конструктор</Link>
                </p>
              </div>
              <div className={styles.container + " p-5 ml-2"}>
                <ListIcon type="secondary" />
                <div className="p-1" />
                <p
                  className={`text text_type_main-default ${
                    location.pathname === "/profile/orders" ? "" : inactive
                  }`}
                >
                  <Link to={"/profile/orders"}>Лента заказов</Link>
                </p>
              </div>
            </Container>
          </nav>
        </Col>

        <Col w={2}>
          <Container extraClass={styles.center + " p-2"}>
            <Link to={"/"}>
              <Logo />
            </Link>
          </Container>
        </Col>

        <Col w={2}>
          <div className={`${styles.container} ${styles.right} p-5`}>
            <ProfileIcon type="secondary" />
            <p
              className={`text text_type_main-default pl-1 ${
                location.pathname === "/profile" ? "" : inactive
              }`}
            >
              <Link to={"/profile"}>Личный кабинет</Link>
            </p>
          </div>
        </Col>
      </Container>
    </header>
  );
};

export default AppHeader;
