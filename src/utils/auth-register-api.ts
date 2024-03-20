import { ErrorResponse, UserResponse } from "./auth.types";
import { BURGER_API_URL } from "./config";

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type RegisterSuccessResponse = {
  success: boolean;
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
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
      json: () => ErrorResponse | PromiseLike<ErrorResponse>;
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
