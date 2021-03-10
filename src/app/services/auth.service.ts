import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../core/models/config-options';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrlUser = 'http://localhost:3000/users';

  isAdmin = false;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrlUser);
  }

  checkUserIsAdmin(user: User): boolean {
    this.isAdmin = user.role === 'admin';
    return this.isAdmin;
  }
}
