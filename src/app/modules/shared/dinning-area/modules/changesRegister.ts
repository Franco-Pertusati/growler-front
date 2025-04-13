import { Table } from "../../../../core/interfaces/tables";

export interface LayoutChange {
  table: Table,
  action: 'create' | 'delete' | 'update'
}
