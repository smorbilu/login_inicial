
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Login } from '../interfaces/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { username: 'admin', password: '1234', role: 'ADMIN', token: 'token_admin_123' },
    { username: 'user', password: '1234', role: 'USER', token: 'token_user_123' }
  ];

  login(data: Login): Observable<any> {
    const user = this.users.find(
      u => u.username === data.username && u.password === data.password
    );

    if (!user) {
      return throwError(() => ({
        status: 401,
        message: 'Credenciales incorrectas'
      }));
    }

    return of({
      username: user.username,
      role: user.role,
      token: user.token
    }).pipe(delay(800)); 
  }
}