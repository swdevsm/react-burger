import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../index.module.css";
import { Link, useLocation } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();
  const inactive = "text_color_inactive";
  return (
    <header>
      <nav
        className={styles.nav + " " + styles.container + " " + styles.center}
      >
        <ul className={styles.container + " " + styles.center}>
          <li className={styles.container + " p-5"}>
            <BurgerIcon type="primary" />
            <p
              className={`text text_type_main-default pl-2 ${
                location.pathname === "/" ? "" : inactive
              }`}
            >
              <Link to={"/"}>Конструктор</Link>
            </p>
          </li>

          <li className={styles.container + " p-5 ml-2"}>
            <ListIcon type="secondary" />
            <div className="p-1" />
            <p
              className={`text text_type_main-default ${
                location.pathname === "/profile/orders" ? "" : inactive
              }`}
            >
              <Link to={"/profile/orders"}>Лента заказов</Link>
            </p>
          </li>

          <li>
            <div
              className={
                styles.container +
                styles.center +
                " p-2 pl-30 pr-30 ml-30 mr-30"
              }
            >
              <Link to={"/"}>
                <Logo />
              </Link>
            </div>
          </li>

          <li>
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
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
