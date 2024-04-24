import { SyntheticEvent, useCallback } from "react";
import styles from "../../index.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/auth";
import { LoginRequest } from "../../utils/auth-login-api";
import useForm from "../../hooks/useForm";

const LoginPage = () => {
  const auth = useAuth();
  const [values, handleChange] = useForm<LoginRequest>({
    email: "",
    password: "",
  });
  const login = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      auth.signIn(values);
    },
    [auth, values]
  );

  return (
    <main className={styles.formContainer}>
      <form className={`${styles.form} pt-25 mt-10`} onSubmit={login}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput
          name="email"
          extraClass="pt-6"
          value={values.email}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          extraClass="pt-6"
          value={values.password}
          onChange={handleChange}
        />
        <div className="pt-6">
          <Button
            htmlType="submit"
            disabled={Boolean(!values.email || !values.password)}
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
