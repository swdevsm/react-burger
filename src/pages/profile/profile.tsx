import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../index.module.css";
import profileStyles from "./profile.module.css";
import { Link } from "react-router-dom";
import useLocalStorage from "../../hooks/localstorage.hook";
import { useAppDispatch } from "../../store/hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { updateUserRequest } from "../../services/updateUser";
import { useAuth } from "../../services/auth";

const initialFormState = {
  name: "",
  nameDisabled: true,
  currentNameIcon: "EditIcon",
  email: "",
  emailDisabled: true,
  currentEmailIcon: "EditIcon",
  password: "******",
  passwordDisabled: true,
  currentPasswordIcon: "EditIcon",
};

const ProfilePage = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [accessToken] = useLocalStorage<string>("accessToken", "");
  const [state, setState] = useState(initialFormState);

  useEffect(() => {
    auth?.getUser();
  }, []);

  useEffect(() => {
    if (auth?.user) {
      setState({
        ...state,
        name: auth?.user?.name,
        email: auth?.user?.email,
      });
    }
  }, [auth, setState]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

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
        accessToken: accessToken,
        name: state.name,
        email: state.email,
        password: state.password === "******" ? null : state.password,
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
              value={state.name}
              placeholder="Имя"
              onChange={onChange}
              disabled={state.nameDisabled}
              icon={"EditIcon"}
              onIconClick={() => {
                setState({ ...state, nameDisabled: false });
              }}
            />
            <Input
              name="email"
              extraClass="pt-6"
              value={state.email}
              placeholder="Email"
              onChange={onChange}
              disabled={state.emailDisabled}
              icon={"EditIcon"}
              onIconClick={() => {
                setState({ ...state, emailDisabled: false });
              }}
            />
            <Input
              name="password"
              extraClass="pt-6"
              value={state.password}
              placeholder="Пароль"
              onChange={onChange}
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
