import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../index.module.css";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const [state, setState] = useState({ password: "", code: "" });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submit = (e: SyntheticEvent) => {
    // todo: check input
    e.preventDefault();
    console.log(state);
  };
  return (
    <main className={styles.formContainer}>
      <form className={`${styles.form} pt-25 mt-10`} onSubmit={submit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput
          name="password"
          extraClass="pt-6"
          value={state.password}
          onChange={onChange}
          placeholder="Введите новый пароль"
        />
        <Input
          name="code"
          extraClass="pt-6"
          value={state.code}
          onChange={onChange}
          placeholder="Введите код из письма"
        />
        <div className="pt-6">
          <Button htmlType="submit">Сохранить</Button>
        </div>
        <div className="pl-25 pr-25 ml-20 mr-20"></div>
        <p className="text text_type_main-default text_color_inactive pt-20">
          Вспомнили пароль?
          <Button
            extraClass="p-1"
            htmlType="button"
            type="secondary"
            size="medium"
          >
            <Link to="/login">Войти</Link>
          </Button>
        </p>
      </form>
    </main>
  );
};

export default ResetPasswordPage;
