import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { Product } from '../product.model';
import { DiscountPipe } from '../discount.pipe';
import { CartService } from '../cart.service';
import { CartItem } from '../cart-item.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, DiscountPipe], // Ensure RouterModule is included
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() openPopup = new EventEmitter<Product>();

  constructor(private cartService: CartService) {}

  addToCart(): void {
    const cartItem: CartItem = {
      name: this.product.title,
      price: this.product.price,
      thumbnail: this.product.thumbnail
    };
    this.cartService.addToCart(cartItem);
  }

  openProductPopup(): void {
    this.openPopup.emit(this.product);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
