import { useEffect } from "react";
import { useAuth } from "../../services/auth";
import { ProtectedRouteElementProps } from "./ProtectedRouteElement.types";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element }: ProtectedRouteElementProps) => {
  const auth = useAuth();

  useEffect(() => {
    auth?.getUser();
  }, []);

  return auth?.user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRouteElement;
