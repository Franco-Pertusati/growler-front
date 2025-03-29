export interface Table {
  id: number;
  name: string;
  products: number[];
  total: number;
  state: 'empty' | 'reserved' | 'occupied' | 'ticketPrinted';
  startTime: number;
  waiter: string;
  guestCount: number;
  pos: number;
}
