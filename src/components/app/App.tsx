import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import HomePage from "../../pages/home/home";
import IngredientPage from "../../pages/ingredient/ingredient";
import LoginPage from "../../pages/login/login";
import NotFoundPage from "../../pages/not-found/not-found";
import ProfilePage from "../../pages/profile/profile";
import RegisterPage from "../../pages/register/register";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../app-header/AppHeader";
import ProfileOrdersPage from "../../pages/profile-orders/profile-orders";
import ProfileOrderPage from "../../pages/profile-order/profile-order";
import Protected from "../protected/Protected";
import Modal from "../modal/Modal";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { fetchIngredients } from "../../services/ingredients";
import { useAuth } from "../../services/auth";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();
  const auth = useAuth();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!auth.user) {
      auth.getUser();
    }
  }, []);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route
          path="/profile/orders"
          element={<Protected children={<ProfileOrdersPage />} />}
        />
        <Route
          path="/profile/orders/:number"
          element={<Protected children={<ProfileOrderPage />} />}
        />
        <Route
          path="/profile"
          element={<Protected children={<ProfilePage />} />}
        />
        <Route
          path="/login"
          element={<Protected children={<LoginPage />} anonymous />}
        />
        <Route
          path="/register"
          element={<Protected children={<RegisterPage />} anonymous />}
        />
        <Route
          path="/forgot-password"
          element={<Protected children={<ForgotPasswordPage />} anonymous />}
        />
        <Route
          path="/reset-password"
          element={<Protected children={<ResetPasswordPage />} anonymous />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredient/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredient/:id"
            element={
              <Modal header="Детали ингредиента" onClose={handleModalClose}>
                <IngredientPage />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
