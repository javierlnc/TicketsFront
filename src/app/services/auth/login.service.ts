import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject({id:'',document:'', name:'',lastname:'',rol:''});

  constructor(private http: HttpClient) { }
  login(credentials: LoginRequest): Observable<User> {
    return this.http.get<User>('direccion').pipe(
      tap((userData: User) => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
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

  get userData(): Observable<User>{
    return this.currentUserData.asObservable();
  }
  get userLogin():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
