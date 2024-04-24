import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../index.module.css";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  passwordResetRequest,
  selectPasswordReset,
} from "../../services/resetPassword";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ForgotPasswordPage = () => {
  const [state, setState] = useState({ email: "", error: false });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { data: passwordReset, status } = useAppSelector(selectPasswordReset);
  const dispatch = useAppDispatch();
  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (state.email && !state.error) {
      dispatch(passwordResetRequest(state.email));
    }
  };
  if (status === "finished" && passwordReset === true) {
    return <Navigate to="/reset-password" />;
  }
  return (
    <main className={styles.formContainer}>
      <form className={`${styles.form} pt-25 mt-10`} onSubmit={submit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput
          name="email"
          extraClass="pt-6"
          value={state.email}
          onChange={onChange}
        />
        <div className="pt-6">
          <Button htmlType="submit" disabled={!state.email}>
            {"Восстановить"}
          </Button>
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

export default ForgotPasswordPage;
