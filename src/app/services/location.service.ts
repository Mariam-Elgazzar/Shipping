import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class LocationService {
   
  private apiUrl = '/api/locations';

  private sampleGovernments = [
    'Cairo',
    'Alexandria',
    'Giza',
    'Sharm El Sheikh',
    'Luxor',
    'Aswan',
    'Port Said',
  ];

  private sampleCities: Record<string, string[]> = {
    Cairo: ['Nasr City', 'Maadi', 'Heliopolis', 'Downtown', 'New Cairo'],
    Alexandria: ['Miami', 'Montaza', 'Sidi Gaber', 'Agami', 'Borg El Arab'],
    Giza: ['Dokki', 'Mohandessin', '6th of October', 'Sheikh Zayed', 'Haram'],
    'Sharm El Sheikh': ['Naama Bay', 'Sharks Bay', 'Nabq Bay', 'Old Market'],
    Luxor: ['East Bank', 'West Bank', 'Karnak', 'New Luxor'],
    Aswan: ['Elephantine Island', 'Aswan City', 'Nubian Village'],
    'Port Said': ['Port Fouad', 'El Manakh', 'El Arab', 'El Sharq'],
  };

  constructor(private http: HttpClient) {}

  getGovernments(): Observable<string[]> {
    // return this.http.get<string[]>(`${this.apiUrl}/governments`);
    return of(this.sampleGovernments);
  }

  getCities(): Observable<Record<string, string[]>> {
    // return this.http.get<Record<string, string[]>>(`${this.apiUrl}/cities`);
    return of(this.sampleCities);
  }

  getCitiesByGovernment(government: string): Observable<string[]> {
    // return this.http.get<string[]>(`${this.apiUrl}/governments/${government}/cities`);
    return of(this.sampleCities[government] || []);
  }
}
