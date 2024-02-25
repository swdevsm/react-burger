import { IngredientProps } from "../burger-ingredients/BurgerIngredients.types";
import Col from "../col/Col";
import Container from "../container/Container";
import styles from "../../index.module.css";

interface IngredientDetailsItemProps {
  label: string;
  value: number;
}

const IngredientDetailsItem = ({
  label,
  value,
}: IngredientDetailsItemProps) => {
  return (
    <Container extraClass={styles.center + " pl-5"}>
      <Col w={6}>
        <Container extraClass={styles.center}>
          <p className="text text_type_main-default text_color_inactive">
            {label}
          </p>
        </Container>
      </Col>
      <Col extraClass={"pt-2"}>
        <Container extraClass={styles.center}>
          <p className="text text_type_digits-default text_color_inactive">
            {value}
          </p>
        </Container>
      </Col>
    </Container>
  );
};

const IngredientDetails = ({ ingredient }: IngredientProps) => {
  return (
    <Container>
      <Col w={6}>
        <Container extraClass={styles.center}>
          <img src={ingredient.image_large} />
        </Container>
      </Col>

      <Col w={6}>
        <Container extraClass={styles.center}>
          <p className="text text_type_main-medium">{ingredient.name}</p>
        </Container>
      </Col>

      <Col w={6}>
        <Container extraClass={styles.center + " pt-8 pb-10 mb-5"}>
          <IngredientDetailsItem
            label="Калории,ккал"
            value={ingredient.calories}
          />
          <IngredientDetailsItem label="Белки, г" value={ingredient.proteins} />
          <IngredientDetailsItem label="Жиры, г" value={ingredient.fat} />
          <IngredientDetailsItem
            label="Углеводы, г"
            value={ingredient.carbohydrates}
          />
        </Container>
      </Col>
    </Container>
  );
};

export default IngredientDetails;
