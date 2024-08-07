import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PRODUCTS } from '../product-data';
import { ProductPopupComponent } from '../product-popup/product-popup.component';
import { Product } from '../product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ProductPopupComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = PRODUCTS;
  selectedProduct: Product | null = null;
  popupVisible = false;

  openPopup(product: Product): void {
    this.selectedProduct = product;
    this.popupVisible = true;
  }

  closePopup(): void {
    this.popupVisible = false;
    this.selectedProduct = null;
  }
}
