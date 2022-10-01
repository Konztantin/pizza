export type CartItemType = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  count: number;
  type: string;
  size: number;
}

export interface CartSliseState {
  totalPrise: number;
  items: CartItemType[];
}