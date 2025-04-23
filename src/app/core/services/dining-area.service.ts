import { Injectable, signal } from '@angular/core';
import { findIndex, Observable } from 'rxjs';
import { Table } from '../interfaces/tables';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/environmet';
import { ProductInList } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class DiningAreaService {
  diningTables = signal<Table[]>([]);
  selectedTable = signal<Table | null>(null);

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addOrder(tableId: number, order: ProductInList[]) { }

  mergeOrders(orders: ProductInList[]) { }

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
}
