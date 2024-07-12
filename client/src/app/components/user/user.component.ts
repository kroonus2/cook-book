import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/User/user.service';
import { UserDetails } from '../../interfaces/user-detail';
import { NavbarComponent } from '../navbar/navbar.component';
import { RecipeService } from '../../services/Recipe/recipe.service';
import { NewRecipeDetails, RecipeDetails } from '../../interfaces/recipe-detail';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/Category/categories.service';

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

  protected categories: any[] = [];
  protected user: UserDetails | null = null;
  protected difficulties = ['Fácil', 'Média', 'Difícil'];
  protected recipes: RecipeDetails[] | null = null;
  protected newRecipe : NewRecipeDetails = {
    name: '', 
    description: '', 
    instructions: '', 
    preparation_time: 0, 
    difficulty: '', 
    user_id: 0,
    category_id: 0
  }

  showNewRecipeForm = false; // Controla a visibilidade do formulário de nova receita

  ngOnInit(): void {
    this.getAuthUserAndLoadRecipes();
    this.loadCategories();
  }

  toggleNewRecipeForm() {
    this.showNewRecipeForm = !this.showNewRecipeForm;
  }

  // Usando o operador switchMap do Rxjs para sincronizar as duas requisições, pois as receitas precisam do id do usuario para serem feitas. 

  getAuthUserAndLoadRecipes() {
    this.userService.getUserLoggedIn().pipe(
      switchMap((response: any) => {
        this.user = response.user;
        if (this.user) {
          return this.recipeService.getRecipe(this.user.id);
        } else {
          return of(null);
        }
      })
    ).subscribe({
      next: (response: any) => {
        if (response) {
          this.recipes = response.recipes as RecipeDetails[];
          console.log("Recipes fetched successfully");
          console.log(response.recipes);
        }
      },
      error: (error) => {
        console.log("Error fetching user or recipes: ", error);
      }
    });
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

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Desconhecida';
  }

  submitNewRecipe() {
    // Defina o ID do usuário no objeto da nova receita
    if (this.user) {
      this.newRecipe.user_id = this.user.id;
    }

    this.recipeService.newRecipe(this.newRecipe).subscribe({
      next: (response: any) => {
        console.log("Recipe created successfully");
        location.reload(); // Recarrega a página após a inserção bem-sucedida
      },
      error: (error) => {
        console.log("Error creating recipe: ", error);
      }
    });
  }
}
