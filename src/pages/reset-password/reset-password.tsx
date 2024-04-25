import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../index.module.css";
import { FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPasswordReset } from "../../services/resetPassword";
import {
  passwordResetActionRequest,
  selectPasswordResetAction,
} from "../../services/resetPasswordAction";
import { PasswordWithToken } from "../../utils/auth-password-reset-api";
import useForm from "../../hooks/useForm";

const ResetPasswordPage = () => {
  const { data: passwordReset } = useAppSelector(selectPasswordReset);
  const { status: passwordResetActionStatus } = useAppSelector(
    selectPasswordResetAction
  );
  const dispatch = useAppDispatch();
  const [values, handleChange] = useForm<PasswordWithToken>({
    password: "",
    token: "",
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.password && values.token) {
      dispatch(
        passwordResetActionRequest({
          password: values.password,
          token: values.token,
        })
      );
    }
  };
  if (!passwordReset) return <Navigate to="/not-found" />;
  if (passwordResetActionStatus === "error") {
    console.log("error on reset action"); // fixme: what to do on error ?
  }
  if (passwordResetActionStatus === "finished") {
    return <Navigate to="/login" />;
  }
  return (
    <main className={styles.formContainer}>
      <form className={`${styles.form} pt-25 mt-10`} onSubmit={submit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput
          name="password"
          extraClass="pt-6"
          value={values.password}
          onChange={handleChange}
          placeholder="Введите новый пароль"
        />
        <Input
          name="token"
          extraClass="pt-6"
          value={values.token}
          onChange={handleChange}
          placeholder="Введите код из письма"
        />
        <div className="pt-6">
          <Button
            htmlType="submit"
            disabled={Boolean(!values.password && !values.token)}
          >
            {"Сохранить"}
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

export default ResetPasswordPage;
