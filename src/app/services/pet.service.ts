import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  readonly token: string = localStorage.getItem('token');
  readonly URL: string = `${environment.API_URL}/animals`;

  filters: Object;
  data: Observable<Object>;

  // TODO: see if I can initialize http to have default headers with the token
  constructor(private http: HttpClient) {}

  private isNewRequest(filters: Object): Boolean {
    const keys = Object.keys(this.filters);

    if (keys.length !== Object.keys(filters).length) {
      return true;
    }

    for (let key of keys) {
      if (this.filters[key] !== filters[key]) {
        return true;
      }
    }

    return false;
  }

  getPets(filters: Object = {}): Observable<Object> {
    // check if it needs to make a new request (no data or different query params)
    if (!this.data || this.isNewRequest(filters)) {
      // update filters property
      this.filters = filters;

      let reqUrl = this.URL + '?limit=21';
      const pairs = Object.entries(filters);

      // add query params to url to make request
      for (const [key, value] of pairs) {
        reqUrl += `&${key}=${value}`;
      }

      console.log('Fetching data');
      this.data = this.http.get(reqUrl, {
        headers: { ['Authorization']: `Bearer ${this.token}` },
      });

      return this.data;
    }

    return this.data;
  }

  getPet(id: number): Observable<Object> {
    return this.http.get(`${this.URL}/${id}`, {
      headers: { ['Authorization']: `Bearer ${this.token}` },
    });
  }
}
