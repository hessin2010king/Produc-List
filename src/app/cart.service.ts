import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);

  addToCart(item: CartItem): void {
    const existingItem = this.cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity ?? 0) + 1;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
    this.cartSubject.next(this.cart);
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  getCartUpdates() {
    return this.cartSubject.asObservable();
  }

  updateQuantity(item: CartItem, quantity: number): void {
    const cartItem = this.cart.find(cartItem => cartItem.name === item.name);
    if (cartItem && quantity > 0) {
      cartItem.quantity = quantity;
    } else if (cartItem && quantity === 0) {
      this.removeItem(cartItem);
    }
    this.cartSubject.next(this.cart);
  }

  removeItem(item: CartItem): void {
    this.cart = this.cart.filter(cartItem => cartItem.name !== item.name);
    this.cartSubject.next(this.cart);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + (item.price * (item.quantity ?? 1)), 0);
  }

  getTotalQuantity(): number {
    return this.cart.reduce((total, item) => total + (item.quantity ?? 1), 0);
  }
}
