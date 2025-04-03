import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Ingredient, Product } from '../modules/products';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // Product methods
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/products`);
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/api/products/${id}`);
  }

  createProduct(productData: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/api/products`, productData);
  }

  updateProduct(id: number, productData: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/api/products/${id}`, productData);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/api/products/${id}`);
  }

  // Category methods
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/api/categories`);
  }


  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/api/categories/${id}`);
  }

  createCategory(categoryData: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/api/categories`, categoryData);
  }

  updateCategory(id: number, categoryData: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/api/categories/${id}`, categoryData);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/api/categories/${id}`);
  }

  // Ingredient methods
  getIngredients(): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.apiUrl}/api/ingredients`);
  }

  getIngredient(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.apiUrl}/api/ingredients/${id}`);
  }

  createIngredient(ingredientData: any): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.apiUrl}/api/ingredients`, ingredientData);
  }

  updateIngredient(id: number, ingredientData: any): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.apiUrl}/api/ingredients/${id}`, ingredientData);
  }

  deleteIngredient(id: number): Observable<Ingredient> {
    return this.http.delete<Ingredient>(`${this.apiUrl}/api/ingredients/${id}`);
  }

  // Special methods for relationships
  addIngredientToProduct(productId: number, ingredientId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/products/${productId}/add_ingredient/${ingredientId}`, {});
  }

  removeIngredientFromProduct(productId: number, ingredientId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/products/${productId}/remove_ingredient/${ingredientId}`, {});
  }
}
