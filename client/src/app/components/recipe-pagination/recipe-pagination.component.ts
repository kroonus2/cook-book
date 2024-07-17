import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RecipeService } from '../../services/Recipe/recipe.service';
import { CategoriesService } from '../../services/Category/categories.service';
import { RecipeDetails } from '../../interfaces/recipe-detail';

@Component({
  selector: 'app-recipe-pagination',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './recipe-pagination.component.html',
  styleUrl: './recipe-pagination.component.css'
})
export class RecipePaginationComponent implements OnInit{
  private recipeService = inject(RecipeService);
  private categoriesService = inject(CategoriesService);
  protected recipes: RecipeDetails[] = [];
  protected categories: any[] = [];

  ngOnInit(): void {
    this.loadRecipes();
    this.loadCategories();
  }

  loadRecipes(){
    this.recipeService.getRecipes().subscribe(({
      next: (response: any) =>{
        this.recipes = response.recipes as RecipeDetails[];
        console.log("Recipes fetched successfully");
        console.log(this.recipes);
      }, 
      error: (error) => {
        console.log("Error fetching recipes: ", error);
      }
    }));
  }
  
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Desconhecida';
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

}
