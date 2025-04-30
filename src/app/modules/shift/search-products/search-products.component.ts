import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, Product } from '../../../core/interfaces/products';

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.css'
})
export class SearchProductsComponent {
  @Input() categories:Category[] = []
  @Output() prodToAdd = new EventEmitter<Product>();
  searchResult: Product[] = []

  updateSearchValue(event: any) {
    const searchValue = event.target.value;
    const products = this.categories.flatMap(c => c.products ?? []);
    const result = products.filter(p =>
      p.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (result && searchValue != ' ') {
      this.searchResult = result
    }
    if (searchValue.length === 0) this.searchResult = []
  }

  addProduct(product: Product) {
    this.prodToAdd.emit(product)
  }
}
