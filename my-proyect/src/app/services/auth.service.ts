import { Injectable } from '@angular/core';
import { Login } from '../interfaces/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private fakeUser = {
    username: 'admin',
    password: '123456'
  };

  login(data: Login): boolean {
    console.log('DATA:', data);

    return (
      data.username === this.fakeUser.username &&
      data.password === this.fakeUser.password
    );
  }
}