import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Home from "../../pages/home/home";
import Ingredient from "../../pages/ingredient/ingredient";
import Login from "../../pages/login/login";
import NotFound from "../../pages/not-found/not-found";
import Profile from "../../pages/profile/profile";
import Register from "../../pages/register/register";
import ResetPassword from "../../pages/reset-password/reset-password";
import { Routes, Route } from "react-router-dom";

const NewApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingredient/:id" element={<Ingredient />} />
      {/* <Route path="/order-history" element={<OrderHistory />} /> */}
      {/* <Route path="/order-list" element={<OrderList />} /> */}

      <Route path="/not-found" element={<NotFound />} />

      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default NewApp;
