import { OrderDetailsProps } from "./OrderDetails.types";
import orderDetailsStyles from "./OrderDetails.module.css";
import done from "../../images/done.png";
import Container from "../container/Container";
import Col from "../col/Col";
import styles from "../../index.module.css";

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const { id, state } = order;
  const orderId = <p className="text text_type_digits-large">{id}</p>;
  const loading = <p className="text text_type_main-medium pb-20">Загрузка</p>;
  const error = <p className="text text_type_main-medium pb-20">Ошибка :(</p>;
  const orderIdMessage = (
    <p className="text text_type_main-medium">идентификатор заказа</p>
  );
  const startMessage = (
    <p className="text text_type_main-default">Ваш заказ начали готовить</p>
  );
  const waitMessage = (
    <p className="text text_type_main-default text_color_inactive">
      Дождитесь готовности на орбитальной станции
    </p>
  );
  if (state == "loading") {
    return (
      <Container>
        <Col w={6}>
          <Container extraClass={styles.center}>{loading}</Container>
        </Col>
      </Container>
    );
  }
  if (state == "error") {
    return (
      <Container>
        <Col w={6}>
          <Container extraClass={styles.center}>{error}</Container>
        </Col>
      </Container>
    );
  }
  return (
    <Container>
      <Col w={6}>
        <Container extraClass={styles.center}>{orderId}</Container>
      </Col>

      <Col w={6}>
        <Container extraClass={styles.center + " pt-8"}>
          {orderIdMessage}
        </Container>
      </Col>

      <Col w={6}>
        <Container extraClass={styles.center + " pt-10 mt-5"}>
          <img className={orderDetailsStyles.image} src={done} alt="Logo" />
        </Container>
      </Col>

      <Col w={6}>
        <Container extraClass={styles.center + " pt-10 mt-5"}>
          {startMessage}
        </Container>
      </Col>

      <Col w={6}>
        <Container extraClass={styles.center + " pt-2 pb-10 mb-5"}>
          {waitMessage}
        </Container>
      </Col>
    </Container>
  );
};

export default OrderDetails;
