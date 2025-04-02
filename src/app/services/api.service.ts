import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/products`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/categories`);
  }

  getCategory(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/categories/${id}`);
  }

  getIngredient(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/ingredients/${id}`);
  }
}
