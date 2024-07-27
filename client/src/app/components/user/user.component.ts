import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/User/user.service';
import { RecipeService } from '../../services/Recipe/recipe.service';
import { CategoriesService } from '../../services/Category/categories.service';
import { UserDetails } from '../../interfaces/user-detail';
import { NewRecipeDetails, RecipeDetails } from '../../interfaces/recipe-detail';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private userService = inject(UserService);
  private recipeService = inject(RecipeService);
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  protected categories: any[] = [];
  protected user: UserDetails | null = null;
  protected difficulties = ['Fácil', 'Média', 'Difícil'];
  protected recipes: RecipeDetails[] | null = null;
  protected newRecipe: NewRecipeDetails = this.getEmptyNewRecipe();
  protected editingRecipe: RecipeDetails | null = null;

  showNewRecipeForm = false;
  visibleOptionsMenus: Set<number> = new Set();

  ngOnInit(): void {
    this.loadUserAndRecipes();
    this.loadCategories();
  }

  private getEmptyNewRecipe(): NewRecipeDetails {
    return {
      name: '', 
      description: '', 
      instructions: '', 
      preparation_time: 0, 
      difficulty: '', 
      user_id: 0,
      category_id: 0
    };
  }

  toggleNewRecipeForm() {
    this.showNewRecipeForm = !this.showNewRecipeForm;
    if (!this.showNewRecipeForm) {
      this.resetNewRecipeForm();
      this.editingRecipe = null;
    }
  }

  loadUserAndRecipes() {
    this.userService.getUserLoggedIn().pipe(
      switchMap((response: any) => {
        this.user = response.user;
        if (this.user) {
          return this.recipeService.getRecipeByUser(this.user.id);
        } else {
          return of(null);
        }
      })
    ).subscribe({
      next: (response: any) => {
        if (response) {
          this.recipes = response.recipes as RecipeDetails[];
        }
      },
      error: error => console.log("Error fetching user or recipes: ", error)
    });
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response : any) => {
        this.categories = response.categories;
      },
      error: error => console.log("Error fetching categories: ", error)
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Desconhecida';
  }

  onRedirectRecipe(recipeId : number){
    this.router.navigate(['/recipe', recipeId]);
  }

  onSubmitNewRecipe() {
    if (this.user) {
      this.newRecipe.user_id = this.user.id;
    }

    this.recipeService.newRecipe(this.newRecipe).subscribe({
      next: () => {
        console.log("Recipe created successfully");
        location.reload();
      },
      error: error => console.log("Error creating recipe: ", error)
    });
  }

  onUpdateRecipe() {
    if (this.editingRecipe) {
      this.recipeService.updateRecipe(this.editingRecipe.id, this.newRecipe).subscribe({
        next: () => {
          console.log("Recipe updated successfully");
          location.reload();
        },
        error: error => console.log("Error updating recipe: ", error)
      });
    }
  }
  
  onRemoveRecipe(recipeId: number) {
    this.recipeService.deleteRecipe(recipeId).subscribe({
      next: () => {
        console.log("Recipe removed successfully");
        this.recipes = this.recipes?.filter(recipe => recipe.id !== recipeId) || null;
      },
      error: error => console.log("Error removing recipe: ", error)
    });
  }

  onArchiveRecipe(recipeId: number) {
    console.log(`Archive recipe with ID: ${recipeId}`);
  }

  editRecipe(recipe: RecipeDetails) {
    this.editingRecipe = recipe;
    this.newRecipe = { ...recipe };
    this.showNewRecipeForm = true;
  }

  toggleOptionsMenu(recipeId: number) {
    if (this.visibleOptionsMenus.has(recipeId)) {
      this.visibleOptionsMenus.delete(recipeId);
    } else {
      this.visibleOptionsMenus.clear();
      this.visibleOptionsMenus.add(recipeId);
    }
  }

  trackByRecipeId(index: number, recipe: RecipeDetails) {
    return recipe.id;
  }

  resetNewRecipeForm() {
    this.newRecipe = this.getEmptyNewRecipe();
  }
}
