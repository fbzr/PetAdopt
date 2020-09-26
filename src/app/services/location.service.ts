import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  latitude: number;
  longitude: number;

  constructor() {}

  getCoords(): { latitude: number; longitude: number } {
    if (!this.latitude || !this.longitude) {
      return null;
    }

    return {
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }

  requestCoords(): Observable<any> {
    return new Observable((observer) => {
      if (!this.latitude || !this.longitude) {
        if (window.navigator && window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(
            (position) => {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              observer.next({
                latitude: this.latitude,
                longitude: this.longitude,
              });
              observer.complete();
            },
            (error) => observer.error(error.message)
          );
        } else {
          observer.error('Unsupported Browser');
        }
      } else {
        observer.next({
          latitude: this.latitude,
          longitude: this.longitude,
        });
      }
    });
  }
}
