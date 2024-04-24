import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../index.module.css";
import { SyntheticEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerRequest, selectRegister } from "../../services/register";
import {
  RegisterRequest,
  RegisterSuccessResponse,
} from "../../utils/auth-register-api";
import useLocalStorage from "../../hooks/localstorage.hook";
import { ErrorResponse } from "../../utils/auth.types";
import useForm from "../../hooks/useForm";

const RegisterPage = () => {
  const [values, handleChange] = useForm<RegisterRequest>({
    name: "",
    email: "",
    password: "",
  });
  const [, setAccessToken] = useLocalStorage<string>("accessToken", "");
  const [, setRefreshToken] = useLocalStorage<string>("refreshToken", "");
  const { data: registerResult, status: registerStatus } =
    useAppSelector(selectRegister);
  const dispatch = useAppDispatch();

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (values.name && values.email && values.password) {
      dispatch(registerRequest(values));
    }
  };

  useEffect(() => {
    if (registerStatus === "error") {
      console.log((registerResult as ErrorResponse).message);
    }
    if (registerStatus === "finished") {
      const result = registerResult as RegisterSuccessResponse;
      setAccessToken(result.accessToken);
      setRefreshToken(result.refreshToken);
    }
  }, [registerResult, registerStatus, setAccessToken, setRefreshToken]);

  return (
    <main className={styles.formContainer}>
      <form className={`${styles.form} pt-25 mt-10`} onSubmit={submit}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          name="name"
          extraClass="pt-6"
          value={values.name}
          onChange={handleChange}
          placeholder="Имя"
        />
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
            disabled={Boolean(
              !values.name || !values.email || !values.password
            )}
          >
            Зарегистрироваться
          </Button>
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
