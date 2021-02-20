import { Injectable } from '@angular/core';
import { IUser } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    {
      name: 'admin',
      password: 'admin',
      role: 'administrator'
    },
    {
      name: 'user',
      password: 'user',
      role: 'user'
    }
  ];

  isAdmin = false;
  isLogged = false;

  constructor() { }

  checkUserIsAdmin(name: string, password: string): boolean {
    this.isLogged = false;
    this.users.forEach((data: IUser) => {
      if (data.name === name && data.password === password) {
        this.isAdmin = data.role === 'administrator';
        this.isLogged = true;
      }
    });
    return this.isLogged;
  }
}
