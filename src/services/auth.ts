import { useContext, useState, createContext, useEffect } from "react";
import { ErrorResponse, UserResponse } from "../utils/auth.types";
import { LoginRequest, LoginSuccessResponse } from "../utils/auth-login-api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginRequest, reset, selectLogin } from "./login";
import useLocalStorage from "../hooks/localstorage.hook";
import { logoutRequest, selectLogout } from "./logout";

export interface AuthContextProps {
  user: UserResponse | null;
  signIn: (request: LoginRequest) => void;
  signOut: (cb: () => void) => void;
}
export const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = (): AuthContextProps => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const { data: loginResult, status: loginStatus } =
    useAppSelector(selectLogin);
  const { data: logoutResult, status: logoutStatus } =
    useAppSelector(selectLogout);
  const dispatch = useAppDispatch();
  const [, setAccessToken] = useLocalStorage<string>("accessToken", "");
  const [refreshToken, setRefreshToken] = useLocalStorage<string>(
    "refreshToken",
    ""
  );

  useEffect(() => {
    if (loginStatus === "error") {
      console.log((loginResult as ErrorResponse).message);
      dispatch(reset());
    }
    if (loginResult && loginStatus === "finished") {
      const result = loginResult as LoginSuccessResponse;
      setUser(result.user);
      setAccessToken(result.accessToken);
      setRefreshToken(result.refreshToken);
    }
  }, [loginResult, dispatch, loginStatus, setAccessToken, setRefreshToken]);

  useEffect(() => {
    if (logoutStatus === "error") {
      console.log((logoutResult as ErrorResponse).message);
    }
    if (logoutResult && logoutStatus === "finished") {
      setAccessToken("");
      setRefreshToken("");
    }
  }, [logoutResult, logoutStatus, setAccessToken, setRefreshToken]);

  const signIn = async (request: LoginRequest) => {
    if (request.email && request.password) {
      dispatch(loginRequest(request));
    }
  };

  const signOut = (cb: () => void) => {
    setUser(null);
    dispatch(logoutRequest({ token: refreshToken }));
    cb();
  };

  return {
    user,
    signIn,
    signOut,
  };
};
