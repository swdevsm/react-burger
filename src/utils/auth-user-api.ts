import { checkResponse } from "./api";
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

export const user = (accessToken: string) => {
  const url = `${BURGER_API_URL}/auth/user`;
  return fetch(url, {
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: accessToken,
    },
  })
    .then(checkResponse)
    .then((json) => json);
};

export type UpdateUserRequest = {
  name: string | null;
  email: string | null;
  password: string | null;
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
  })
    .then(checkResponse)
    .then((json) => json);
};
