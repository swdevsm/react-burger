import { checkResponse } from "./api";
import { BURGER_API_URL } from "./config";

export const passwordReset = (email: string) => {
  const url = `${BURGER_API_URL}/password-reset`;
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(checkResponse)
    .then((json) => json.success);
};

export type PasswordWithToken = {
  password: string;
  token: string;
};

export const passwordResetAction = (passwordWithToken: PasswordWithToken) => {
  const url = `${BURGER_API_URL}/password-reset/reset`;
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passwordWithToken),
  })
    .then(checkResponse)
    .then((json) => json.success);
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type UserResponse = {
  email: string;
  name: string;
};

export type RegisterSuccessResponse = {
  success: boolean;
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
};

export type RegisterErrorResponse = {
  success: boolean;
  message: string;
};

export type RegisterResponse =
  | (Omit<Response, "json"> & {
      status: 201;
      json: () =>
        | RegisterSuccessResponse
        | PromiseLike<RegisterSuccessResponse>;
    })
  | (Omit<Response, "json"> & {
      status: 403;
      json: () => RegisterErrorResponse | PromiseLike<RegisterErrorResponse>;
    });

const marshalResponse = (res: RegisterResponse) => {
  if (res.status === 201) return res.json();
  if (res.status === 403) return res.json();
  return Error("Unhandled response code");
};

const responseHandler = (response: Response) => {
  const res = response as RegisterResponse;
  return marshalResponse(res);
};

export const register = (registerRequest: RegisterRequest) => {
  const url = `${BURGER_API_URL}/auth/register`;
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerRequest),
  }).then((json) => responseHandler(json));
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginSuccessResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
};

export type LoginErrorResponse = {
  success: boolean;
  message: string;
};

export type LoginResponse =
  | (Omit<Response, "json"> & {
      status: 200;
      json: () => LoginSuccessResponse | PromiseLike<LoginSuccessResponse>;
    })
  | (Omit<Response, "json"> & {
      status: 401;
      json: () => LoginErrorResponse | PromiseLike<LoginErrorResponse>;
    });

const marshalLoginResponse = (res: LoginResponse) => {
  if (res.status === 200) return res.json();
  if (res.status === 401) return res.json();
  return Error(`Unhandled response code`);
};

const responseLoginHandler = (response: Response) => {
  const res = response as LoginResponse;
  return marshalLoginResponse(res);
};

export const login = (request: LoginRequest) => {
  const url = `${BURGER_API_URL}/auth/login`;
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  }).then((json) => responseLoginHandler(json));
};
