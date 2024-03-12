export type Order = {
  id: string;
  state: "loading" | "error" | "finished";
};

export interface OrderDetailsProps {
  order: Order;
}
