import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';


const BASE_URL = environment.apiUrl + 'categories';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  private http = inject(HttpClient);

  constructor() { }

  getCategories(){
    return this.http.get(BASE_URL);
  }
}
