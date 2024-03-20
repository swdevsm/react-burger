import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../index.module.css";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerRequest, selectRegister } from "../../services/register";
import {
  RegisterErrorResponse,
  RegisterSuccessResponse,
} from "../../utils/auth-api";

const RegisterPage = () => {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const { data: registerResult, status: registerStatus } =
    useAppSelector(selectRegister);
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (state.name && state.email && state.password) {
      dispatch(registerRequest({ ...state }));
    }
  };

  if (registerStatus === "error") {
    console.log((registerResult as RegisterErrorResponse).message);
  }
  if (registerStatus === "finished") {
    const result = registerResult as RegisterSuccessResponse;
    // todo: save tokens
    console.log(result);
  }
  return (
    <main className={styles.formContainer}>
      <form className={`${styles.form} pt-25 mt-10`} onSubmit={submit}>
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
          <Button
            htmlType="submit"
            disabled={Boolean(!state.name || !state.email || !state.password)}
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
