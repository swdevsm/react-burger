import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import styles from "../../index.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginRequest, reset, selectLogin } from "../../services/login";
import { LoginErrorResponse, LoginSuccessResponse } from "../../utils/auth-api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { data: loginResult, status: loginStatus } =
    useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  const submit = (e: SyntheticEvent) => {
    // todo: check input
    e.preventDefault();
    if (state.email && state.password) {
      dispatch(loginRequest({ ...state }));
    }
  };

  useEffect(() => {
    if (loginStatus === "error") {
      console.log((loginResult as LoginErrorResponse).message);
      dispatch(reset()); // fixme: error in console
    }
    if (loginStatus === "finished") {
      // todo: save tokens
      console.log(loginResult as LoginSuccessResponse);
      return navigate("/");
    }
  }, [loginResult, dispatch, loginStatus, navigate]);

  return (
    <main className={styles.formContainer}>
      <form className={`${styles.form} pt-25 mt-10`} onSubmit={submit}>
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
