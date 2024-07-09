import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoriesService } from '../../services/Category/categories.service';
import { AuthService } from '../../services/Auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  private authService = inject(AuthService);
  
  isLoggedIn$: Observable<Boolean>;
  categories: any[] = [];
  isDropdownHidden: boolean = true;

  constructor() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  toggleDropdown() {
    this.isDropdownHidden = !this.isDropdownHidden;
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.categories;
        console.log("Categories fetched successfully");
      },
      error: (error) => {
        console.log("Error fetching categories: ", error);
      }
    });
  }

  logoutUser() {
    this.authService.logout();
  }
}
