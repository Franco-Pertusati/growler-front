import { ListedProd } from "./products";

export interface Table {
  id: number;
  name: string;
  position: number;
  state: number;
  round: boolean;
  products: ListedProd[]
}

export interface ListedTable {
  id: number,
  startTime: number,
  endTime: number,
  name: string,
  total: number,
  paymentMethod: string,
  products: ListedProd[]
}
