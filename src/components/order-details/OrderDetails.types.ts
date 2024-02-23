export type Order = {
  id: string;
  state: "start" | "cancel";
};

export interface OrderDetailsProps {
  order: Order;
}
