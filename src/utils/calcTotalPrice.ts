import { CartItemType } from "../redux/slices/cart/types";


export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
}