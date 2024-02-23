import { OrderDetailsProps } from "./OrderDetails.types";
import orderDetailsStyles from "./OrderDetails.module.css";
import done from "../../images/done.png";

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
    <div className={orderDetailsStyles.box}>
      {orderId}
      <div className={orderDetailsStyles.message + " pt-8"}>
        {orderIdMessage}
      </div>
      <div className={orderDetailsStyles.imageBox + " pt-10 mt-5"}>
        <img className={orderDetailsStyles.image} src={done} alt="Logo" />
      </div>
      <div className={orderDetailsStyles.message + " pt-10 mt-5"}>
        {startMessage}
      </div>
      <div className={orderDetailsStyles.message + " pt-2 pb-10 mb-5"}>
        {waitMessage}
      </div>
    </div>
  );
};

export default OrderDetails;
