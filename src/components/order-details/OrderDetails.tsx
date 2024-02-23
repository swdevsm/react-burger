import { OrderDetailsProps } from "./OrderDetails.types";
import orderDetailsStyles from "./OrderDetails.module.css";
import done from "../../images/done.png";
import Container from "../container/Container";
import Col from "../col/Col";

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const orderId = <p className="text text_type_digits-large">{order.id}</p>;
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
  return (
    <Container>
      <Col w={6}>
        <Container extraClass={orderDetailsStyles.center}>{orderId}</Container>
      </Col>

      <Col w={6}>
        <Container extraClass={orderDetailsStyles.center + " pt-8"}>
          {orderIdMessage}
        </Container>
      </Col>

      <Col w={6}>
        <Container extraClass={orderDetailsStyles.center + " pt-10 mt-5"}>
          <img className={orderDetailsStyles.image} src={done} alt="Logo" />
        </Container>
      </Col>

      <Col w={6}>
        <Container extraClass={orderDetailsStyles.center + " pt-10 mt-5"}>
          {startMessage}
        </Container>
      </Col>

      <Col w={6}>
        <Container extraClass={orderDetailsStyles.center + " pt-2 pb-10 mb-5"}>
          {waitMessage}
        </Container>
      </Col>
    </Container>
  );
};

export default OrderDetails;
