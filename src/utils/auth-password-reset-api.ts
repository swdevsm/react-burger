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
