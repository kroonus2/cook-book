import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NewRecipeDetails, RecipeDetails } from '../../interfaces/recipe-detail';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.apiUrl + 'recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);

  constructor() { }

  // Fetch all recipes
  getRecipes(): Observable<RecipeDetails[]> {
    return this.http.get<RecipeDetails[]>(BASE_URL).pipe(
      catchError(this.handleError<RecipeDetails[]>('getRecipes', []))
    );
  }

  // Fetch a specific recipe by ID
  getRecipeById(Id: number): Observable<RecipeDetails> {
    const url = `${BASE_URL}/${Id}`;
    return this.http.get<RecipeDetails>(url).pipe(
      catchError(this.handleError<RecipeDetails>(`getRecipe id=${Id}`))
    );
  }

  // Fetch a specific recipe by userID
  getRecipeByUser(userID: number): Observable<RecipeDetails> {
    const url = `${BASE_URL}/user/${userID}`;
    return this.http.get<RecipeDetails>(url).pipe(
      catchError(this.handleError<RecipeDetails>(`getRecipe id=${userID}`))
    );
  }

  // Create a new recipe
  newRecipe(recipe: NewRecipeDetails): Observable<RecipeDetails> {
    return this.http.post<RecipeDetails>(BASE_URL, recipe).pipe(
      catchError(this.handleError<RecipeDetails>('newRecipe'))
    );
  }

  // Update an existing recipe by recipeID
  updateRecipe(recipeID: number, recipe: NewRecipeDetails): Observable<any> {
    const url = `${BASE_URL}/${recipeID}`;
    return this.http.put(url, recipe).pipe(
      catchError(this.handleError<any>(`updateRecipe id=${recipeID}`))
    );
  }

  // Delete a recipe by recipeID
  deleteRecipe(recipeID: number): Observable<any> {
    const url = `${BASE_URL}/${recipeID}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError<any>(`deleteRecipe id=${recipeID}`))
    );
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log the error to the console
      // Let the app keep running by returning an empty result.
      return throwError(() => new Error(error.message));
    };
  }
}
