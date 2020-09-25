import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  getCoords(): Observable<any> {
    return new Observable((observer) => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            observer.complete();
          },
          (error) => observer.error(error.message)
        );
      } else {
        observer.error('Unsupported Browser');
      }
    });
  }
}
