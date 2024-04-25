import { checkResponse } from "./api";
import { BURGER_API_URL } from "./config";

export const getIngredients = () => {
  const url = `${BURGER_API_URL}/ingredients`;
  return fetch(url)
    .then(checkResponse)
    .then((json) => (json.success ? json.data : []));
};

export interface CreateOrderRequest {
  selectedIngredients: string[];
  accessToken: string;
}

export const createOrder = (request: CreateOrderRequest) => {
  const url = `${BURGER_API_URL}/orders`;
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: request.accessToken,
    },
    body: JSON.stringify({
      ingredients: request.selectedIngredients,
    }),
  })
    .then(checkResponse)
    .then((json) => (json.success ? json.order?.number : null));
};
