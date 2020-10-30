import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {  }

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly URL: string = environment.PETADOPT_API;

  constructor(private http: HttpClient) {}

  login() {
    
  }
}
