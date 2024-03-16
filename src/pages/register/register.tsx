import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submit = (e: SyntheticEvent) => {
    // todo: check input
    e.preventDefault();
    console.log(state);
  };
  return (
    <main className={styles.container}>
      <form className={`${styles.main} pt-25 mt-10`} onSubmit={submit}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          name="name"
          extraClass="pt-6"
          value={state.name}
          onChange={onChange}
          placeholder="Имя"
        />
        <EmailInput
          name="email"
          extraClass="pt-6"
          value={state.email}
          onChange={onChange}
        />
        <PasswordInput
          name="password"
          extraClass="pt-6"
          value={state.password}
          onChange={onChange}
        />
        <div className="pt-6">
          <Button htmlType="submit">Зарегистрироваться</Button>
        </div>
        <p className="text text_type_main-default text_color_inactive pt-20">
          Уже зарегистрированы?
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

export default RegisterPage;
