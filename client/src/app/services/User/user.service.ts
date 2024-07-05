import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDetail } from '../../interfaces/user-detail';

const BASE_URL = environment.apiUrl + 'users';
const USER_URL = environment.apiUrl + 'auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  constructor() { }

  newUser(user: UserDetail): Observable<UserDetail> {
    return this.http.post<UserDetail>(BASE_URL, {user})
      .pipe(
        catchError(this.handleError<UserDetail>('newUser'))
      );
  }

  getUserLoggedIn(): Observable<UserDetail> {
    return this.http.get<UserDetail>(USER_URL)
      .pipe(
        catchError(this.handleError<UserDetail>('getUsrLogged'))
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
