import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../index.module.css";
import profileStyles from "./profile.module.css";
import { Link } from "react-router-dom";
import useLocalStorage from "../../hooks/localstorage.hook";
import { useAppDispatch } from "../../store/hooks";
import { useEffect, useState } from "react";
import { updateUserRequest } from "../../services/updateUser";
import { useAuth } from "../../services/auth";
import { UpdateUserRequest } from "../../utils/auth-user-api";
import useForm from "../../hooks/useForm";

const editFormState = {
  nameDisabled: true,
  currentNameIcon: "EditIcon",
  emailDisabled: true,
  currentEmailIcon: "EditIcon",
  passwordDisabled: true,
  currentPasswordIcon: "EditIcon",
};

const ProfilePage = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [accessToken] = useLocalStorage<string>("accessToken", "");
  const [state, setState] = useState(editFormState);
  const [values, handleChange, setValues] = useForm<UpdateUserRequest>({
    name: "",
    email: "",
    password: "******",
    accessToken: "",
  });

  useEffect(() => {
    auth?.getUser();
  }, []);

  useEffect(() => {
    if (auth?.user && values.name === "" && values.email === "") {
      setValues({
        ...values,
        name: auth?.user?.name,
        email: auth?.user?.email,
      });
    }
  }, [auth, setValues, values]);

  const handleLogout = () => {
    auth?.signOut(() => {
      console.log("logout");
    });
  };

  const handleCancelClick = () => {
    setState({
      ...state,
      passwordDisabled: true,
      nameDisabled: true,
      emailDisabled: true,
    });
  };
  const handleSaveClick = () => {
    dispatch(
      updateUserRequest({
        ...values,
        accessToken: accessToken,
        password: values.password === "******" ? null : values.password,
      })
    );
  };

  const nonActiveStyle = "text_color_inactive";
  const active = true;

  return (
    <main className={styles.formContainer}>
      <div className={`${styles.form} pt-25 mt-10`}>
        <div className={profileStyles.container}>
          <aside className={profileStyles.aside + " pr-15"}>
            <p
              className={`text text_type_main-medium ${
                active ? "" : nonActiveStyle
              }  pt-4`}
            >
              Профиль
            </p>
            <p className={`text text_type_main-medium ${nonActiveStyle} pt-4`}>
              <Link to="/profile/orders">История заказов</Link>
            </p>
            <p className={`text text_type_main-medium ${nonActiveStyle}  pt-4`}>
              <span onClick={handleLogout}>Выход</span>
            </p>
          </aside>
          <section>
            <Input
              name="name"
              extraClass="pt-6"
              // todo: do not save state before 'save' button
              value={values.name ?? ""}
              placeholder="Имя"
              onChange={handleChange}
              disabled={state.nameDisabled}
              icon={"EditIcon"}
              onIconClick={() => {
                setState({ ...state, nameDisabled: false });
              }}
            />
            <Input
              name="email"
              extraClass="pt-6"
              value={values.email ?? ""}
              placeholder="Email"
              onChange={handleChange}
              disabled={state.emailDisabled}
              icon={"EditIcon"}
              onIconClick={() => {
                setState({ ...state, emailDisabled: false });
              }}
            />
            <Input
              name="password"
              extraClass="pt-6"
              value={values.password ?? ""}
              placeholder="Пароль"
              onChange={handleChange}
              disabled={state.passwordDisabled}
              icon={"EditIcon"}
              onIconClick={() => {
                setState({ ...state, passwordDisabled: false });
              }}
            />
            {/* todo: fix layout */}
            <p
              className={`text text_type_main-default ${nonActiveStyle} pt-20`}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
            {(!state.emailDisabled ||
              !state.nameDisabled ||
              !state.passwordDisabled) && (
              <>
                <Button
                  htmlType="button"
                  type="secondary"
                  size="large"
                  onClick={handleCancelClick}
                >
                  Отмена
                </Button>
                <Button
                  htmlType="button"
                  type="primary"
                  size="large"
                  onClick={handleSaveClick}
                >
                  Сохранить
                </Button>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
