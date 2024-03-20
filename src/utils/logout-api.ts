import { BURGER_API_URL } from "./config";

export type LogoutRequest = {
  token: string;
};

export type LogoutRequestSuccessResponse = {
  success: boolean;
  message: string;
};

export type LogoutRequestResponse =
  | Omit<Response, "json"> & {
      status: 200;
      json: () =>
        | LogoutRequestSuccessResponse
        | PromiseLike<LogoutRequestSuccessResponse>;
    };

const marshalRefreshTokenResponse = (res: LogoutRequestResponse) => {
  if (res.status === 200) return res.json();
  return Error(`Unhandled response code`);
};

const responseLogoutHandler = (response: Response) => {
  const res = response as LogoutRequestResponse;
  return marshalRefreshTokenResponse(res);
};

export const login = (request: LogoutRequestResponse) => {
  const url = `${BURGER_API_URL}/auth/logout`;
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  }).then((json) => responseLogoutHandler(json));
};
