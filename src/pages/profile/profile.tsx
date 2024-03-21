import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../index.module.css";
import profileStyles from "./profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/localstorage.hook";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutRequest, selectLogout } from "../../services/logout";
import { selectUser, userRequest } from "../../services/user";
import { UserSuccessResponse } from "../../utils/auth-user-api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { status: logoutStatus } = useAppSelector(selectLogout);
  const { data: userResult, status: userStatus } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [accessToken, setAccessToken] = useLocalStorage<string>(
    "accessToken",
    ""
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string>(
    "refreshToken",
    ""
  );

  useEffect(() => {
    if (userStatus !== "finished" && accessToken) {
      dispatch(userRequest(accessToken));
    }
  }, [accessToken, dispatch, userStatus]);

  useEffect(() => {
    if (accessToken === "" && refreshToken === "") {
      navigate("/login");
    }
  }, [accessToken, navigate, refreshToken]);

  useEffect(() => {
    if (logoutStatus === "finished") {
      setAccessToken("");
      setRefreshToken("");
    }
  }, [logoutStatus, navigate, setAccessToken, setRefreshToken]);

  const handleLogout = () => {
    dispatch(logoutRequest({ token: refreshToken }));
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
              value={(userResult as UserSuccessResponse)?.user?.name ?? ""}
              placeholder="Имя"
              onChange={() => {}}
              disabled
              icon={"EditIcon"}
            />
            <EmailInput
              name="email"
              extraClass="pt-6"
              value={(userResult as UserSuccessResponse)?.user?.email ?? ""}
              onChange={() => {}}
              disabled
              isIcon
            />
            <Input
              name="password"
              extraClass="pt-6"
              value={"*******"}
              placeholder="Пароль"
              onChange={() => {}}
              disabled
              icon={"EditIcon"}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
