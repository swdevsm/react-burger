import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../index.module.css";
import profileStyles from "./profile.module.css";
import { Link, Navigate } from "react-router-dom";
import useLocalStorage from "../../hooks/localstorage.hook";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutRequest } from "../../services/logout";
import { selectUser, userRequest } from "../../services/user";
import { UserSuccessResponse } from "../../utils/auth-user-api";
import { ChangeEvent, useEffect, useState } from "react";
// import {
// refreshTokenRequest,
// selectRefreshToken,
// } from "../../services/refreshToken";
// import { RefreshTokenSuccessResponse } from "../../utils/auth-refresh-token-api";

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
  const { data: userResult, status: userStatus } = useAppSelector(selectUser);
  // const { data: refreshTokenResult, status: refreshTokenStatus } =
  // useAppSelector(selectRefreshToken);
  const dispatch = useAppDispatch();
  const [accessToken, setAccessToken] = useLocalStorage<string>(
    "accessToken",
    ""
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string>(
    "refreshToken",
    ""
  );
  const [state, setState] = useState(initialFormState);

  useEffect(() => {
    if (userResult && userStatus === "finished") {
      console.log("f");
      const result = userResult as UserSuccessResponse;
      setState({
        ...state,
        name: result?.user?.name,
        email: result?.user?.email,
      });
    }
  }, [userResult, userStatus, setState]);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  if (accessToken && !userResult) {
    dispatch(userRequest(accessToken));
  }

  // if (accessToken && userStatus === "error") {
  // dispatch(refreshTokenRequest({ token: refreshToken }));
  // }

  // if (
  //   refreshTokenStatus === "finished" &&
  //   accessToken &&
  //   userStatus === "error"
  // ) {
  //   const newToken = refreshTokenResult as RefreshTokenSuccessResponse;
  //   setAccessToken(newToken?.accessToken);
  // }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    dispatch(logoutRequest({ token: refreshToken }));
    setAccessToken("");
    setRefreshToken("");
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
            <p
              className={`text text_type_main-default ${nonActiveStyle} pt-20`}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </aside>
          <section>
            <Input
              name="name"
              extraClass="pt-6"
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
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
