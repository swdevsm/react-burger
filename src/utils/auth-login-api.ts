import { checkResponse } from "./api";
import { ErrorResponse, UserResponse } from "./auth.types";
import { BURGER_API_URL } from "./config";

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

export type LoginResponse =
  | (Omit<Response, "json"> & {
      status: 200;
      json: () => LoginSuccessResponse | PromiseLike<LoginSuccessResponse>;
    })
  | (Omit<Response, "json"> & {
      status: 401;
      json: () => ErrorResponse | PromiseLike<ErrorResponse>;
    });

export const login = (request: LoginRequest) => {
  const url = `${BURGER_API_URL}/auth/login`;
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then(checkResponse)
    .then((json) => json as LoginSuccessResponse);
};
