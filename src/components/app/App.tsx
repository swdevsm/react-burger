import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import HomePage from "../../pages/home/home";
import IngredientPage from "../../pages/ingredient/ingredient";
import LoginPage from "../../pages/login/login";
import NotFoundPage from "../../pages/not-found/not-found";
import ProfilePage from "../../pages/profile/profile";
import RegisterPage from "../../pages/register/register";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import { Routes, Route } from "react-router-dom";
import AppHeader from "../app-header/AppHeader";
import ProfileOrdersPage from "../../pages/profile-orders/profile-orders";
import ProfileOrderPage from "../../pages/profile-order/profile-order";
import ProtectedRouteElement from "../protected-route-element/ProtectedRouteElement";

const App = () => {
  return (
    <>
      <header>
        <AppHeader />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredient/:id" element={<IngredientPage />} />

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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
