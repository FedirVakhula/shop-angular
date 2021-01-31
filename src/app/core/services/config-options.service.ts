import { Injectable } from '@angular/core';
import { User } from '../interface/config-options';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {
  user = new User();

  constructor() { }

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = new User(user);
  }
}
