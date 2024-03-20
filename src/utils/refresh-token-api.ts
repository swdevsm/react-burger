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

const marshalRefreshTokenResponse = (res: RefreshTokenResponse) => {
  if (res.status === 200) return res.json();
  if (res.status === 401) return res.json();
  return Error(`Unhandled response code`);
};

const responseRefreshTokenHandler = (response: Response) => {
  const res = response as RefreshTokenResponse;
  return marshalRefreshTokenResponse(res);
};

export const login = (request: RefreshTokenResponse) => {
  const url = `${BURGER_API_URL}/auth/refresh`;
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  }).then((json) => responseRefreshTokenHandler(json));
};
