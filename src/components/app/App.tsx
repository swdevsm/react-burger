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
import ProtectedRouteElement from "../protected-route-element/ProtectedRouteElement";
import Modal from "../modal/Modal";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <header>
        <AppHeader />
      </header>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredient/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/profile/orders"
          element={<ProtectedRouteElement element={<ProfileOrdersPage />} />}
        />
        <Route
          path="/profile/orders/:number"
          element={<ProtectedRouteElement element={<ProfileOrderPage />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
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
