import { useAuth } from "../../services/auth";
import { ProtectedProps } from "./Protected.types";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children, anonymous = false }: ProtectedProps) => {
  const auth = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && auth.user) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default Protected;
