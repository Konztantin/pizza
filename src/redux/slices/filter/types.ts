export type SortItem = {
  name: string,
  sort: string,
  desc: string
}

export interface FilterSlicaState {
  sort: SortItem;
  categoryId: number,
  pagecount: number,
  searchValue: string
}