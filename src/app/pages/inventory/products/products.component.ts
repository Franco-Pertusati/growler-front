import { Component } from '@angular/core';
import { Product } from '../../../modules/products';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = []

  constructor(private apiService: ApiService) { }


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe(
      (data: any) => {
        this.products = data.member;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
