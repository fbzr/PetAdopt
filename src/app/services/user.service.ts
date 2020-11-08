import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly URL: string = environment.PETADOPT_API;

  user: User;
  constructor(private http: HttpClient) {}

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  login(platform: string) {
    return this.http.get(`${this.URL}/auth/${platform}`);
  }
}
