import { useEffect, useState } from "react";
import { useAuth } from "../../services/auth";
import { ProtectedRouteElementProps } from "./ProtectedRouteElement.types";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element }: ProtectedRouteElementProps) => {
  const auth = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    auth?.getUser();
  }, []);

  useEffect(() => {
    if (auth?.user) {
      setUserLoaded(true);
    }
  }, [auth]);

  if (!isUserLoaded) return null;

  return auth?.user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRouteElement;
