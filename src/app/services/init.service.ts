import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  readonly AUTH_URL: string = `${environment.API_URL}/oauth2/token`;
  readonly BODY: Object = {
    client_id: environment.API_KEY,
    client_secret: environment.API_SECRET,
    grant_type: 'client_credentials',
  };

  constructor(private http: HttpClient) {}

  private loadGoogleApiScript(): void {
    console.log('loadGoogleApiScript() called');
    //load script
    let script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_API_KEY}`;

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  init(): Promise<void> {
    // Request api token and save it in local storage
    console.log('InitService.init() called');
    return new Promise<void>((resolve) => {
      this.loadGoogleApiScript();
      this.http.post(this.AUTH_URL, this.BODY).subscribe((res) => {
        localStorage.setItem('token', res['access_token']);
        resolve();
      });
    });
  }
}
