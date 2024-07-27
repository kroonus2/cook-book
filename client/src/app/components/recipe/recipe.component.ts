import { Component, OnInit, inject } from '@angular/core';
import { RecipeDetails } from '../../interfaces/recipe-detail';
import { RecipeService } from '../../services/Recipe/recipe.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CategoriesService } from '../../services/Category/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit{
  private recipeService = inject(RecipeService);
  private categoriesService = inject(CategoriesService);
  private route = inject(ActivatedRoute);

  protected recipe: RecipeDetails | null = null;
  protected categories: any[] = [];
  protected  recipeId: number | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.recipeId = +params.get('id')!;
      this.loadRecipe();
    });
    this.loadCategories();
  }

  loadRecipe() {
    if (this.recipeId !== null) {
      this.recipeService.getRecipeById(this.recipeId).subscribe({
        next: (response: any) => {
          this.recipe = response.recipe;
          console.log("Recipe fetched successfully");
          console.log(this.recipe);
        },
        error: (error) => {
          console.log("Error fetching recipe: ", error);
        }
      });
    }
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
