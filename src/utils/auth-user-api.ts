import { ErrorResponse, UserResponse } from "./auth.types";
import { BURGER_API_URL } from "./config";

export type UserSuccessResponse = {
  success: boolean;
  user: UserResponse;
};

export type UserResultResponse =
  | (Omit<Response, "json"> & {
      status: 200;
      json: () => UserSuccessResponse | PromiseLike<UserSuccessResponse>;
    })
  | (Omit<Response, "json"> & {
      status: 401;
      json: () => ErrorResponse | PromiseLike<ErrorResponse>;
    })
  | (Omit<Response, "json"> & {
      status: 403;
      json: () => ErrorResponse | PromiseLike<ErrorResponse>;
    });

const marshalUserResponse = (res: UserResultResponse) => {
  if (res.status === 200) return res.json();
  if (res.status === 401) return res.json();
  if (res.status === 403) return res.json();
  return Error(`Unhandled response code`);
};

const responseUserHandler = (response: Response) => {
  const res = response as UserResultResponse;
  return marshalUserResponse(res);
};

export const user = (accessToken: string) => {
  const url = `${BURGER_API_URL}/auth/user`;
  return fetch(url, {
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: accessToken,
    },
  }).then((json) => responseUserHandler(json));
};

export type UpdateUserRequest = {
  name: string;
  email: string;
  password: string;
  accessToken: string;
};

export const updateUser = (updateUserRequest: UpdateUserRequest) => {
  const url = `${BURGER_API_URL}/auth/user`;
  return fetch(url, {
    method: "patch",
    headers: {
      Accept: "application/json",
      Authorization: updateUserRequest.accessToken,
    },
    body: JSON.stringify({
      user: {
        name: updateUserRequest.name,
        email: updateUserRequest.email,
        password: updateUserRequest.password,
      },
    }),
  }).then((json) => responseUserHandler(json));
};
