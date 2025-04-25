import { ListedProd, Product } from "./products";

export interface Table {
  id: number;
  name: string;
  position: number;
  state: number;
  round: boolean;
  products: ListedProd[]
}
