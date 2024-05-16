import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, provideRouter } from '@angular/router';
import { CategoriesService } from '../../services/Category/categories.service';
import { AuthService } from '../../services/Auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  private categoriesServices = inject(CategoriesService);
  private authServices = inject(AuthService);
  
  isLoggedIn$: Observable<Boolean>;
  categories: any[] = [];

  isSidebarExpanded: boolean = false;
  isDropdownHidden: boolean = true;

  constructor(){
    this.isLoggedIn$ = this.authServices.isLoggedIn();
  }

  ngOnInit(): void {
      this.loadCategories();

  }

  toggleSidebar(){
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  toggleDropdown(){
    this.isDropdownHidden = !this.isDropdownHidden;
  }

  loadCategories(){
    this.categoriesServices.getCategories().subscribe(({
      next: (res: any) => {
        this.categories = res.categories
        console.log("Categories fetched successfully");
      },
      error: (error) => {
        console.log("Error fetching categories: ", error);
      }
    }));
  }
}
