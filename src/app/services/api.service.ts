import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Ingredient, Product } from '../modules/products';
import { Table } from '../modules/tables';

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

  createProduct(productData: any): Observable<Product> {
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

  //Dinning Area
  getTables(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/dinig_tables`);
  }

  updateTable(id: number, data: Table): Observable<Table> {
    return this.http.patch<Table>(`${this.apiUrl}/api/dinig_tables/${id}`, data);
  }

  deleteTable(id: number) {
    return this.http.delete<Table>(`${this.apiUrl}/api/dinig_tables/${id}`);
  }

  create(table: Table) {
    return this.http.post<Table>(`${this.apiUrl}/api/dinig_tables`, table);
  }
}
