import { BURGER_API_URL } from "./config";

export const getIngredients = () => {
  const url = `${BURGER_API_URL}/ingredients`;
  return fetch(url)
    .then(checkResponse)
    .then((json) => (json.success ? json.data : []))
    .catch((e) => {
      console.error("There has been a problem with fetch operation:", e);
    });
};

export const createOrder = (selectedIngredients: string[]) => {
  const url = `${BURGER_API_URL}/orders`;
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: selectedIngredients,
    }),
  })
    .then(checkResponse)
    .then((json) => (json.success ? json.order?.number : null))
    .catch((e) => {
      console.error("There has been a problem with fetch operation:", e);
    });
};

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
