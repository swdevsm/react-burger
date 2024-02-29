import { ApiData } from "../../ApiData.types";

export interface BurgerConstructorProps {
  data: Array<ApiData>;
}

export type TotalState = {
  sum: number;
};

export type TotalAction = {
  type: "inc" | "dec" | "clear";
  sum: number;
};
