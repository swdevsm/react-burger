import { useContext, useState, createContext, useEffect } from "react";
import { ErrorResponse, UserResponse } from "../utils/auth.types";
import { LoginRequest, LoginSuccessResponse } from "../utils/auth-login-api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginRequest, reset, selectLogin } from "./login";
import useLocalStorage from "../hooks/localstorage.hook";
import { logoutRequest, selectLogout } from "./logout";
import { selectUser, userRequest } from "./user";
import { UserSuccessResponse } from "../utils/auth-user-api";

export interface AuthContextProps {
  user: UserResponse | null;
  getUser: () => void;
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
  const [accessToken, setAccessToken] = useLocalStorage<string>(
    "accessToken",
    ""
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string>(
    "refreshToken",
    ""
  );
  const { data: userResult, status: userStatus } = useAppSelector(selectUser);

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

  useEffect(() => {
    if (userResult && userStatus === "finished") {
      const result = userResult as UserSuccessResponse;
      setUser(result.user);
    }
  }, [userResult, userStatus, setUser]);

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

  const getUser = () => {
    dispatch(userRequest(accessToken));
  };

  return {
    user,
    getUser,
    signIn,
    signOut,
  };
};
