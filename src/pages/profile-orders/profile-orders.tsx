import { Link } from "react-router-dom";
import styles from "../../index.module.css";
import profileOrdersStyles from "./profile-orders.module.css";
import { logoutRequest } from "../../services/logout";
import useLocalStorage from "../../hooks/localstorage.hook";
import { useAppDispatch } from "../../store/hooks";

const ProfileOrdersPage = () => {
  const dispatch = useAppDispatch();
  const [refreshToken] = useLocalStorage<string>("refreshToken", "");

  const handleLogout = () => {
    dispatch(logoutRequest({ token: refreshToken }));
  };
  const nonActiveStyle = "text_color_inactive";
  return (
    <main className={styles.formContainer}>
      <div className={`${styles.form} pt-25 mt-10`}>
        <div className={profileOrdersStyles.container}>
          <aside className={profileOrdersStyles.aside + " pr-15"}>
            <p className={`text text_type_main-medium ${nonActiveStyle}  pt-4`}>
              <Link to="/profile">Профиль</Link>
            </p>
            <p className={`text text_type_main-medium pt-4`}>
              <Link to="/profile/orders">История заказов</Link>
            </p>
            <p className={`text text_type_main-medium ${nonActiveStyle}  pt-4`}>
              <span onClick={handleLogout}>Выход</span>
            </p>
          </aside>
          <section>
            <p className={`text text_type_main-default pt-4`}>TODO: history</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfileOrdersPage;
