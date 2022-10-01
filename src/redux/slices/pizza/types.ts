import { SortItem } from "../filter/types";

export type FetchPizzasArgs = {
  category: string;
  search: string;
  pagecount: string;
  sort: SortItem;
}

export type PizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  count: number;
  type: number[];
  size: number[];
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
}

export interface PizzaSlise {
  items: PizzaItem[];
  isLoading: Status;
}