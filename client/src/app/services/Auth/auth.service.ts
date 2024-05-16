import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginDetail } from '../../interfaces/login-detail';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LocalService } from '../LocalStorage/local.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap } from 'rxjs/operators';

const BASE_URL = environment.apiUrl + 'login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private localService = inject(LocalService);
  private jwtHelper = inject(JwtHelperService);
  private loggedIn = new BehaviorSubject<Boolean>(this.hasValidToken());

  constructor() { }

  public newLogin(login: LoginDetail): Observable<any> {
    return this.http.post<{ token: string }>(BASE_URL, login).pipe(
      tap(response => {
        if (response.token) {
          this.login(response.token);
        }
      }),
      catchError(this.handleError<any>('newLogin'))
    );
  }

  public login(token: string) {
    this.localService.saveData('token', token);
    this.loggedIn.next(true);
  }

  public logout() {
    this.localService.removeData('token');
    this.loggedIn.next(false);
  }

  public isLoggedIn(): Observable<Boolean> {
    return this.loggedIn.asObservable();
  }

  private hasValidToken(): boolean {
    const token = this.localService.getData('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(error.message));
    };
  }
}
