import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../index.module.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className={styles.formContainer}>
      <div className={`${styles.form} pt-25 mt-10`}>
        <h2 className="text text_type_main-medium">Не нашлось что-то</h2>
        <p className="text text_type_main-default text_color_inactive pt-20">
          <Button
            extraClass="p-1"
            htmlType="button"
            type="secondary"
            size="medium"
          >
            <Link to="/">go home</Link>
          </Button>
          or
          <Button
            extraClass="p-1"
            htmlType="button"
            type="secondary"
            size="medium"
          >
            <a href="https://ya.ru" target="_blank" rel="noopener noreferrer">
              go hard
            </a>
          </Button>
        </p>
      </div>
    </main>
  );
};

export default NotFoundPage;
