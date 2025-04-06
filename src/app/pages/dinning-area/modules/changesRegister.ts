import { Table } from "../../../modules/tables";

export interface LayoutChange {
  table: Table,
  action: 'create' | 'delete' | 'update'
}
