import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RecipeDetail } from '../interfaces/recipe-datail';
import { Observable } from 'rxjs';


const BASE_URL = 'http://localhost:3000/recipes/';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);

  constructor() { }

  getRecipes(): Observable<RecipeDetail>{
    return this.http.get<RecipeDetail>(BASE_URL);
  }
}
