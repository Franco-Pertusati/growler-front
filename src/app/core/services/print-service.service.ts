import { Injectable } from '@angular/core';
import { Table } from '../interfaces/tables';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  printTicket(table: Table): void {
    const printWindow = window.open('', '_blank');

    if (!printWindow) {
      console.error('No se pudo abrir la ventana de impresión');
      return;
    }

    const content = this.buildTicketContent(table);

    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Ticket Mesa ${table.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .ticket { width: 80mm; max-width: 100%; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 10px; }
            .header h2 { margin: 0; font-size: 18px; }
            .info { margin-bottom: 15px; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            .table th, .table td { padding: 5px; text-align: left; border-bottom: 1px dashed #ccc; }
            .table th { font-weight: bold; }
            .total { text-align: right; font-weight: bold; font-size: 16px; margin-top: 10px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .state {
              padding: 3px 8px;
              border-radius: 3px;
              font-size: 12px;
              margin-left: 10px;
            }
            .state-0 { background: #f0f0f0; }
            .state-1 { background: #e3f2fd; }
            .state-2 { background: #fff8e1; }
            .state-3 { background: #e8f5e9; }
            @media print {
              .no-print { display: none; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${content}
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 200);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  private buildTicketContent(table: Table): string {
    // Calcular total
    const total = table.products.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    const stateClass = `state-${table.state}`;

    // Construir filas de productos
    const productRows = table.products.map(item => `
      <tr>
        <td>${item.quantity}x ${item.product.name}</td>
        <td>${(item.product.price * item.quantity).toFixed(2)} €</td>
      </tr>
    `).join('');

    return `
      <div class="ticket">
        <div class="header">
          <h2>Ticket Mesa #${table.id}</h2>
          <p>${table.name}
            ${table.round ? '<span class="state">Ronda</span>' : ''}
          </p>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>

        <div class="total">
          Total: ${total.toFixed(2)} €
        </div>

        <div class="footer">
          Gracias por su visita
        </div>

        <button class="no-print" onclick="window.print()">Imprimir</button>
      </div>
    `;
  }
}
