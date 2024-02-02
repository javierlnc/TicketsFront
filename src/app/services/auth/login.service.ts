import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(credentials: LoginRequest): Observable<User> {
    return this.http.get<User>('direccion').pipe(
      catchError(this.handleError)
    );

  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('se produjo un error' + error.error);
    } else {
      console.error('Se reporta un error' + error.error);
    }
    return throwError(() => new Error('Algo salio mal'));
  }
}
