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
import {
  LoginErrorResponse,
  LoginSuccessResponse,
} from "../../utils/auth-login-api";
import useLocalStorage from "../../hooks/localstorage.hook";

const LoginPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const [accessToken, setAccessToken] = useLocalStorage<string>(
    "accessToken",
    ""
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string>(
    "refreshToken",
    ""
  );
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { data: loginResult, status: loginStatus } =
    useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (state.email && state.password) {
      dispatch(loginRequest({ ...state }));
    }
  };

  useEffect(() => {
    if (loginStatus === "error") {
      console.log((loginResult as LoginErrorResponse).message);
      dispatch(reset());
    }
    if (loginStatus === "finished") {
      const result = loginResult as LoginSuccessResponse;
      console.log(result);
      setAccessToken(result.accessToken);
      setRefreshToken(result.refreshToken);
    }
  }, [loginResult, dispatch, loginStatus, setAccessToken, setRefreshToken]);

  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate("/");
    }
  }, [accessToken, navigate, refreshToken]);

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
