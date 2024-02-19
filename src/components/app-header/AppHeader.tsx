import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import appHeaderStyles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <div className={appHeaderStyles.headerBox}>
      <div>
        <div className={appHeaderStyles.headerItem}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </div>
        <p className="p-1"/>
        <div className={appHeaderStyles.headerItem}>
          <ListIcon type="secondary" />
          <div className="p-1" />
          <p className="text text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </div>
      </div>

      <div className={appHeaderStyles.headerLogo}>
        <Logo />
      </div>

      <div className={appHeaderStyles.headerItem}>
        <ProfileIcon type="secondary" />
        <div className="p-1" />
        <p className="text text_type_main-default text_color_inactive">
          Личный кабинет
        </p>
      </div>
    </div>
  );
};

export default AppHeader;
