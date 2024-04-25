import { checkResponse } from "./api";
import { ErrorResponse } from "./auth.types";
import { BURGER_API_URL } from "./config";

export type RefreshTokenRequest = {
  token: string;
};

export type RefreshTokenSuccessResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenResponse =
  | (Omit<Response, "json"> & {
      status: 200;
      json: () =>
        | RefreshTokenSuccessResponse
        | PromiseLike<RefreshTokenSuccessResponse>;
    })
  | (Omit<Response, "json"> & {
      status: 401;
      json: () => ErrorResponse | PromiseLike<ErrorResponse>;
    });

export const refreshToken = (request: RefreshTokenRequest) => {
  const url = `${BURGER_API_URL}/auth/token`;
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then(checkResponse)
    .then((json) => json);
};
