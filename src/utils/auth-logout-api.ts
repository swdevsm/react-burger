import { checkResponse } from "./api";
import { BURGER_API_URL } from "./config";

export type LogoutRequest = {
  token: string;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};

export const logout = (request: LogoutRequest) => {
  const url = `${BURGER_API_URL}/auth/logout`;
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then(checkResponse)
    .then((json) => json as LogoutResponse);
};
