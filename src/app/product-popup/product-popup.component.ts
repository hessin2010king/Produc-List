import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.css']
})
export class ProductPopupComponent {
  @Input() product: Product | null = null;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  closePopup(): void {
    this.close.emit();
  }
}
