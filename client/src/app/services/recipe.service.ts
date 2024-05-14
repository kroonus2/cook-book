import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RecipeDetail } from '../interfaces/recipe-detail';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const BASE_URL = environment.apiUrl + 'recipes';

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
