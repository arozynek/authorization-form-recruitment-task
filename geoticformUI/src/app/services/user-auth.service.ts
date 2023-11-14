import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

const geotikUserAPI = 'http://localhost:9090/crossOriginService';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<any> {
    return this.http
      .get(geotikUserAPI + '/users')
      .pipe(catchError(this.handleError));
  }

  public getUser(id: number): Observable<any> {
    return this.http
      .get(geotikUserAPI + `/users/${id}`)
      .pipe(catchError(this.handleError));
  }

  public login(email: string, password: string): void {
    const http$ = this.http.post<User>(
      geotikUserAPI + '/auth/login',
      {
        email,
        password,
      },
      httpOptions
    );
    http$.subscribe({
      error: (err) => console.log('HTTP Error', err),
      complete: () => console.log('HTTP request completed.'),
    });
  }

  public register(email: string, password: string): Observable<any> | void {
    const http$ = this.http.post<User>(
      geotikUserAPI + '/users',
      {
        email,
        password,
      },
      httpOptions
    );
    http$.subscribe({
      error: (err) => console.log('HTTP Error', err),
      complete: () => console.log('HTTP request completed.'),
    });
  }

  public resetPassword(email: string): string {
    var msg = 'Link do zmiany hasła został wysłany na podany e-mail:' + email;
    return msg;
  }

  private handleError(error: HttpErrorResponse) {
    console.log('error');
    if (error.status === 0) {
      console.error('Am error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened, please try again later.')
    );
  }
}
