import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CategoriesService } from '../../services/Category/categories.service';
import { AuthService } from '../../services/Auth/auth.service';
import { Observable } from 'rxjs';
import { UserService } from '../../services/User/user.service';
import { NewUserDetails } from '../../interfaces/user-detail';
import { TruncateNamePipe } from '../../pipe/truncate-name.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TruncateNamePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  user: NewUserDetails | null = null;


  isLoggedIn$: Observable<Boolean>;
  categories: any[] = [];
  isDropdownHidden: boolean = true;
  isUserHidden: boolean = true;

  constructor() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.getAuthUser();
      } else {
        this.user = null;
      }
    });
  }

  toggleDropdown() {
    this.isDropdownHidden = !this.isDropdownHidden;
  }

  toggleUserMenu(){
    this.isUserHidden = !this.isUserHidden;
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

  getAuthUser(){
    this.userService.getUserLoggedIn().subscribe(({
      next: (res : any) => {
        this.user = res.user;
      },
      error: (error) => {
        console.log("Error fetching user: ", error);
      }
    }));
  }

  logoutUser() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
