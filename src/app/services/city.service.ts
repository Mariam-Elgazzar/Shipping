import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
// import { City } from '../models/City.model';
// import { environment } from '../../environments/environment';
export interface City {
  id: string;
  goverenmentName: string;
  cityName: string;
  cost: string;
  pickupCost: string;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class CityService {
  private mockCitys: City[] = [
    {
      id: '1',
      goverenmentName: 'string',
      cityName: 'defgd@dghjffkmj',
      cost: 'string',
      pickupCost: 'string',
      status: 'true',
    },
    {
      id: '2',
      goverenmentName: '2string',
      cityName: '2defgd@dghjffkmj',
      cost: '2string',
      pickupCost: '2string',
      status: 'false',
    },
    {
      id: '3',
      goverenmentName: 'string',
      cityName: 'defgd@dghjffkmj',
      cost: 'string',
      pickupCost: 'string',
      status: 'true',
    },
  ];
  private apiUrl = '/api/Citys';
  constructor(private http: HttpClient) {}

  // getCitys(): Observable<City[]> {
  //   return this.http.get<City[]>(this.apiUrl);
  // }

  // getCityById(userId: string): Observable<City> {
  //   return this.http.get<City>(`${this.apiUrl}/${userId}`);
  // }

  createCity(City: City): Observable<City> {
    return this.http.post<City>(this.apiUrl, City);
  }

  updateCity(userId: string, City: City): Observable<City> {
    return this.http.put<City>(`${this.apiUrl}/${userId}`, City);
  }

  // deleteCity(userId: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  // }

  getCitys(): Observable<any[]> {
    return of(this.mockCitys).pipe(delay(500));
  }

  getCityDetails(CityId: string): Observable<any> {
    const City = this.mockCitys.find((o) => o.id === CityId);
    return of(City).pipe(delay(300));
  }

  deleteCity(CityId: string): Observable<boolean> {
    // In a real app, this would make an API call
    return of(true).pipe(delay(300));
  }
}
