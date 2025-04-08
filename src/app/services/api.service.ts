import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product } from '../modules/products';
import { Table } from '../modules/tables';
import { User } from '../modules/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // ==============================================
  // Product Methods
  // ==============================================

  /**
   * Retrieves all products
   * @returns Observable of Product array
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/products`);
  }

  /**
   * Retrieves a single product by ID
   * @param id The product ID
   * @returns Observable of Product
   */
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/api/products/${id}`);
  }

  /**
   * Creates a new product
   * @param productData The product data to create
   * @returns Observable of the created Product
   */
  createProduct(productData: any): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/api/products`, productData);
  }

  /**
   * Fully updates a product using PUT
   * @param id The product ID to update
   * @param productData The complete product data
   * @returns Observable of the updated Product
   */
  updateProduct(id: number, productData: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/api/products/${id}`, productData);
  }

  /**
   * Partially updates a product using PATCH
   * @param id The product ID to update
   * @param updates The partial product data
   * @returns Observable of the updated Product
   */
  patchProduct(id: number, updates: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/api/products/${id}`, updates);
  }

  /**
   * Deletes a product by ID
   * @param id The product ID to delete
   * @returns Observable of the deleted Product
   */
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/api/products/${id}`);
  }

  // ==============================================
  // Category Methods
  // ==============================================

  /**
   * Retrieves all categories
   * @returns Observable of Category array
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/api/categories`);
  }

  /**
   * Retrieves a single category by ID
   * @param id The category ID
   * @returns Observable of Category
   */
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/api/categories/${id}`);
  }

  /**
   * Creates a new category
   * @param categoryData The category data to create
   * @returns Observable of the created Category
   */
  createCategory(categoryData: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/api/categories`, categoryData);
  }

  /**
   * Fully updates a category using PUT
   * @param id The category ID to update
   * @param categoryData The complete category data
   * @returns Observable of the updated Category
   */
  updateCategory(id: number, categoryData: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/api/categories/${id}`, categoryData);
  }

  /**
   * Partially updates a category using PATCH
   * @param id The category ID to update
   * @param updates The partial category data
   * @returns Observable of the updated Category
   */
  patchCategory(id: number, updates: Partial<Category>): Observable<Category> {
    return this.http.patch<Category>(`${this.apiUrl}/api/categories/${id}`, updates);
  }

  /**
   * Deletes a category by ID
   * @param id The category ID to delete
   * @returns Observable of the deleted Category
   */
  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/api/categories/${id}`);
  }

  // ==============================================
  // Dining Table Methods
  // ==============================================

  /**
   * Retrieves all dining tables
   * @returns Observable of Table array
   */
  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}/api/dinig_tables`);
  }

  /**
   * Retrieves a single dining table by ID
   * @param id The table ID
   * @returns Observable of Table
   */
  getTable(id: number): Observable<Table> {
    return this.http.get<Table>(`${this.apiUrl}/api/dinig_tables/${id}`);
  }

  /**
   * Creates a new dining table
   * @param tableData The table data to create
   * @returns Observable of the created Table
   */
  createTable(tableData: Table): Observable<Table> {
    return this.http.post<Table>(`${this.apiUrl}/api/dinig_tables`, tableData);
  }

  /**
   * Fully updates a dining table using PUT
   * @param id The table ID to update
   * @param tableData The complete table data
   * @returns Observable of the updated Table
   */
  updateTable(id: number, tableData: Table): Observable<Table> {
    return this.http.put<Table>(`${this.apiUrl}/api/dinig_tables/${id}`, tableData);
  }

  /**
   * Partially updates a dining table using PATCH
   * @param id The table ID to update
   * @param updates The partial table data
   * @returns Observable of the updated Table
   */
  patchTable(id: number, updates: Partial<Table>): Observable<Table> {
    return this.http.patch<Table>(`${this.apiUrl}/api/dinig_tables/${id}`, updates);
  }

  /**
   * Deletes a dining table by ID
   * @param id The table ID to delete
   * @returns Observable of the deleted Table
   */
  deleteTable(id: number): Observable<Table> {
    return this.http.delete<Table>(`${this.apiUrl}/api/dinig_tables/${id}`);
  }

  // ==============================================
  // User Methods
  // ==============================================

  /**
   * Retrieves all users
   * @param params Optional query parameters
   * @returns Observable of User array
   */
  getUsers(params?: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/users`);
  }

  /**
   * Retrieves a single user by ID
   * @param id The user ID
   * @returns Observable of User
   */
  getUser(id: string | number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/users/${id}`);
  }

  /**
   * Creates a new user
   * @param userData The user data to create
   * @returns Observable of the created User
   */
  createUser(userData: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/api/users`, userData);
  }

  /**
   * Fully updates a user using PUT
   * @param id The user ID to update
   * @param userData The complete user data
   * @returns Observable of the updated User
   */
  updateUser(id: string | number, userData: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/api/users/${id}`, userData);
  }

  /**
   * Partially updates a user using PATCH
   * @param id The user ID to update
   * @param updates The partial user data
   * @returns Observable of the updated User
   */
  patchUser(id: string | number, updates: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/api/users/${id}`, updates);
  }

  /**
   * Deletes a user by ID
   * @param id The user ID to delete
   * @returns Observable of any (typically empty response)
   */
  deleteUser(id: string | number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/users/${id}`);
  }
}
