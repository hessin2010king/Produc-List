import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PRODUCTS } from '../product-data';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Convert id to a number
    this.product = PRODUCTS.find(p => p.id === id);
  }

  goBack(): void {
    this.router.navigate(['/']); // Adjust the route as needed
  }

  addToCart(): void {
    if (this.product) {
      console.log('Adding to cart:', this.product);
    }
  }
}
