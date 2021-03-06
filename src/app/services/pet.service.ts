import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  readonly token: string = localStorage.getItem('token');
  readonly URL: string = `${environment.API_URL}/animals`;

  filters: Object;
  data: Observable<Object>;

  // TODO: see if I can initialize http to have default headers with the token
  constructor(
    private http: HttpClient,
    private locationService: LocationService
  ) {}

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

  getCurrentPets(): Observable<Object> {
    return this.data;
  }

  getPets(filters: Object = {}): Observable<Object> {
    // check if it needs to make a new request (no data or different query params)
    if (!this.data || this.isNewRequest(filters)) {
      // update filters property
      this.filters = filters;

      // check if new filter has location
      // if it doesn't, check if user gave permission to access user's location
      if (!this.filters['location']) {
        const coords = this.locationService.getCoords();
        if (coords) {
          this.filters = {
            ...this.filters,
            location: `${coords.latitude},${coords.longitude}`,
          };
        }
      }

      let reqUrl = this.URL + '?limit=21';
      const pairs = Object.entries(this.filters);

      // add query params to url to make request
      for (const [key, value] of pairs) {
        reqUrl += `&${key}=${value}`;
      }

      console.log('fetch url', reqUrl);
      console.log('filters', this.filters);

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

  changePage(page: number): Observable<Object> {
    let reqUrl = this.URL + '?limit=21';
    const pairs = Object.entries(this.filters);

    // add query params to url to make request
    for (const [key, value] of pairs) {
      reqUrl += `&${key}=${value}`;
    }

    reqUrl += `&page=${page}`;

    console.log('Fetching data');
    this.data = this.http.get(reqUrl, {
      headers: { ['Authorization']: `Bearer ${this.token}` },
    });

    return this.data;
  }

  getPetTypes(): Observable<Object> {
    const url = environment.API_URL + '/types';

    return this.http.get(url, {
      headers: { ['Authorization']: `Bearer ${this.token}` },
    });
  }
}
