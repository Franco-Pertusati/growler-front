export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  ingredients: Ingredient[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Ingredient {
  id: number;
  name: string;
}
