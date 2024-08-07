import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../cart.service';  // Import CartService

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    // Check if a user is logged in
    this.isLoggedIn = !!localStorage.getItem('loggedInUser');

    // Subscribe to cart updates
    this.cartService.getCartUpdates().subscribe(cart => {
      this.cartItemCount = cart.reduce((total, item) => total + (item.quantity ?? 1), 0);
    });
  }

  logout() {
    // Clear the logged-in user from local storage
    localStorage.removeItem('loggedInUser');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
