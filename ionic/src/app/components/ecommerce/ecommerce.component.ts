import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-ecommerce',
  standalone: false,
  templateUrl: './ecommerce.component.html',
  styleUrl: './ecommerce.component.scss',
})
export class EcommerceComponent implements OnInit {
  products: Product[] = [];

  // Stores selected products and quantities
  selectedProducts: { [id: number]: { product: Product; quantity: number } } =
    {};

  ngOnInit(): void {
    // Load products from localStorage
    const stored = localStorage.getItem('products');
    if (stored) {
      this.products = JSON.parse(stored);
    }

    // Load selected products from localStorage (if any)
    const selected = localStorage.getItem('selectedProducts');
    if (selected) {
      this.selectedProducts = JSON.parse(selected);
    }
  }

  toggleSelection(product: Product): void {
    if (this.selectedProducts[product.id]) {
      delete this.selectedProducts[product.id];
    } else {
      this.selectedProducts[product.id] = { product, quantity: 1 };
    }
    this.saveSelectedProducts(); // Save after toggle
  }

  isSelected(product: Product): boolean {
    return !!this.selectedProducts[product.id];
  }

  increaseQuantity(product: Product): void {
    if (this.selectedProducts[product.id]) {
      this.selectedProducts[product.id].quantity++;
      this.saveSelectedProducts(); // Save after change
    }
  }

  decreaseQuantity(product: Product): void {
    if (
      this.selectedProducts[product.id] &&
      this.selectedProducts[product.id].quantity > 1
    ) {
      this.selectedProducts[product.id].quantity--;
      this.saveSelectedProducts(); // Save after change
    }
  }

  get checkoutItems() {
    return Object.values(this.selectedProducts);
  }

  get totalPrice(): number {
    return this.checkoutItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  // Helper method to persist selectedProducts to localStorage
  private saveSelectedProducts(): void {
    localStorage.setItem(
      'selectedProducts',
      JSON.stringify(this.selectedProducts)
    );
  }
}
