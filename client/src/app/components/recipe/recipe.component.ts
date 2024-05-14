import { Component, OnInit, inject } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { RecipeDetail } from '../../interfaces/recipe-detail';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [SidebarComponent, ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit{
  private recipeService = inject(RecipeService);
  recipes: RecipeDetail[] = [];

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(){
    this.recipeService.getRecipes().subscribe(({
      next: (response: any) =>{
        this.recipes = response.recipes as RecipeDetail[];
        console.log("Recipes fetched successfully");
      }, 
      error: (error) => {
        console.log("Error fetching recipes: ", error);
      }
    }));
  }
}
