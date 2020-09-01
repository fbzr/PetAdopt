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

  filters: Object;
  data: Observable<Object>;

  constructor(private http: HttpClient) {}

  private isNewRequest(filters: Object): Boolean {
    const keys = Object.keys(this.filters);

    console.log('checking request');
    console.log('previous filters ', this.filters);
    console.log('new filters', filters);
    console.log('keys', keys);
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

  getPets(filters: Object = {}) {
    // check if it needs to make a new request (no data or different query params)
    if (!this.data || this.isNewRequest(filters)) {
      // update filters property
      this.filters = filters;

      let reqUrl = this.URL;
      const pairs = Object.entries(filters);

      // add query params to url to make request
      for (const [key, value] of pairs) {
        reqUrl += `&${key}=${value}`;
      }

      console.log('Fetching data');
      this.data = this.http.get(reqUrl, {
        headers: { ['Authorization']: `Bearer ${this.token}` },
      });
      console.log('service data: ', this.data);
      return this.data;
    }

    return this.data;
  }
}
