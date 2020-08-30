import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  readonly token: string = localStorage.getItem('token');
  readonly URL: string = `${environment.API_URL}/animals?limit=21`;

  data: Observable<Object>;

  constructor(private http: HttpClient) {}

  getPets() {
    if (!this.data) {
      console.log('Fetching data');
      this.data = this.http.get(this.URL, {
        headers: { ['Authorization']: `Bearer ${this.token}` },
      });
      return this.data;
    }

    return this.data;
  }
}
