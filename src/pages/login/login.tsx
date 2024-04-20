import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import styles from "../../index.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../services/auth";

const LoginPage = () => {
  const auth = useAuth();
  const [state, setState] = useState({ email: "", password: "" });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const login = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      auth?.signIn(state);
    },
    [auth, state]
  );

  if (auth?.user) {
    return <Navigate to={"/"} />;
  }

  return (
    <main className={styles.formContainer}>
      <form className={`${styles.form} pt-25 mt-10`} onSubmit={login}>
        <h2 className="text text_type_main-medium">Вход</h2>
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
          <Button
            htmlType="submit"
            disabled={Boolean(!state.email || !state.password)}
          >
            Войти
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive pt-20">
          Вы — новый пользователь?
          <Button
            extraClass="p-1"
            htmlType="button"
            type="secondary"
            size="medium"
          >
            <Link to="/register">Зарегистрироваться</Link>
          </Button>
        </p>
        <p className="text text_type_main-default text_color_inactive pt-4">
          Забыли пароль?
          <Button
            extraClass="p-1"
            htmlType="button"
            type="secondary"
            size="medium"
          >
            <Link to="/forgot-password">Восстановить пароль</Link>
          </Button>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
