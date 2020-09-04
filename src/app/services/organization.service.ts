import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  readonly token: string = localStorage.getItem('token');
  readonly URL: string = `${environment.API_URL}/organizations`;
  data: Observable<Object>;

  constructor(private http: HttpClient) {}

  getOrganization(id: string): Observable<Object> {
    return this.http.get(`${this.URL}/${id}`, {
      headers: { ['Authorization']: `Bearer ${this.token}` },
    });
  }
}
