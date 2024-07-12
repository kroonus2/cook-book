import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NewUserDetails } from '../../interfaces/user-detail';

const BASE_URL = environment.apiUrl + 'users';
const USER_URL = environment.apiUrl + 'auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  constructor() { }

  newUser(user: NewUserDetails): Observable<NewUserDetails> {
    return this.http.post<NewUserDetails>(BASE_URL, {user})
      .pipe(
        catchError(this.handleError<NewUserDetails>('newUser'))
      );
  }

  getUserLoggedIn(): Observable<NewUserDetails> {
    return this.http.get<NewUserDetails>(USER_URL)
      .pipe(
        catchError(this.handleError<NewUserDetails>('getUsrLogged'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Logar o erro no console

      // Retornar um resultado vazio para manter o aplicativo funcionando
      return throwError(() => new Error(error.message));
    };
  }
}
