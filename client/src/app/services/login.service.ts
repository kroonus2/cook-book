import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginDetail } from '../interfaces/login-detail';
import { Observable, catchError, throwError } from 'rxjs';

const BASE_URL = environment.apiUrl + 'login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);

  constructor() { }

  public newLogin(login: LoginDetail){
    console.log({login});
    return this.http.post(BASE_URL, login);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Logar o erro no console

      // Retornar um resultado vazio para manter o aplicativo funcionando
      return throwError(() => new Error(error.message));
    };
  }
}
