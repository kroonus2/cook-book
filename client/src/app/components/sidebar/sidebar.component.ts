import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  private categoriesServices = inject(CategoriesService);
  
  categories: any[] = [];

  isSidebarExpanded: boolean = false;
  isDropdownHidden: boolean = true;

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
        console.log("Error fetching catefories: ", error);
      }
    }));
  }
}
