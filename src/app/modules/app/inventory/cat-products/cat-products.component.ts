import { Component, Input } from '@angular/core';
import { Product } from '../../../../core/interfaces/products';
import { ButtonComponent } from "../../../shared/button/button.component";
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-cat-products',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './cat-products.component.html',
  styleUrl: './cat-products.component.css'
})
export class CatProductsComponent {
  selectedItems: Set<number> = new Set<number>();
  @Input() items: Product[] | undefined = []
  @Input() title: string = 'category'

  constructor(private toast: ToastService) { }

  toggleUserSelection(userId: number): void {
    if (this.isSelected(userId)) {
      this.selectedItems.delete(userId);
    } else {
      this.selectedItems.add(userId);
    }
  }

  isSelected(userId: number): boolean {
    return this.selectedItems.has(userId);
  }

  toggleSelectAll() {
    if (this.items?.length === this.selectedItems.size) {
      this.selectedItems.clear()
    } else {
      this.items?.forEach(user => {
        this.selectedItems.add(user.id)
      });
    }
  }

  demoRestrictionMessage() {
    this.toast.showToast('Modifications are not allowed during the demo version.', 'error')
  }
}
