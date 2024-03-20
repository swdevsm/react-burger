import { BURGER_API_URL } from "./config";

export type UserResponse = {
  email: string;
  name: string;
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
