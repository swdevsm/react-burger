import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./AppHeader.module.css";
import Container from "../container/Container";
import Col from "../col/Col";

const AppHeader = () => {
  return (
    <Container extraClass={appHeaderStyles.center}>
      <Col w={2}>
        <Container extraClass={appHeaderStyles.center}>
          <Container extraClass="p-5">
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default pl-2">Конструктор</p>
          </Container>
          <Container extraClass="p-5 ml-2">
            <ListIcon type="secondary" />
            <div className="p-1" />
            <p className="text text_type_main-default text_color_inactive">
              Лента заказов
            </p>
          </Container>
        </Container>
      </Col>

      <Col w={2}>
        <Container extraClass={appHeaderStyles.center + " p-2"}>
          <Logo />
        </Container>
      </Col>

      <Col w={2}>
        <Container extraClass={appHeaderStyles.right + " p-5"}>
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
