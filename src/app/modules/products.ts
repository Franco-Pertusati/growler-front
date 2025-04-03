export interface Product {
  id?: number;
  name: string;
  price: number;
  category: Category;
  ingredients: Ingredient[];
}

export interface Category {
  id?: number;
  name: string;
  products?: Product[];
}

export interface Ingredient {
  id?: number;
  name: string;
  products?: Product[];
}
