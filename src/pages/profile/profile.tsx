import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../index.module.css";
import profileStyles from "./profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/localstorage.hook";
import { useEffect } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useLocalStorage<string>(
    "accessToken",
    ""
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string>(
    "refreshToken",
    ""
  );
  const handleLogout = () => {
    setAccessToken("");
    setRefreshToken("");
  };
  useEffect(() => {
    if (accessToken === "" && refreshToken === "") {
      navigate("/login");
    }
  }, [accessToken, navigate, refreshToken]);
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
              <div onClick={handleLogout}>Выход</div>
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
              value={"Имя"}
              placeholder="Имя"
              onChange={() => {}}
              disabled
              icon={"EditIcon"}
            />
            <EmailInput
              name="email"
              extraClass="pt-6"
              value={"email@email.com"}
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
