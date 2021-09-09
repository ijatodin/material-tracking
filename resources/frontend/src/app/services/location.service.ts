import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

interface GenericResponse {
  message: string,
  model: any
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/location-all`, {});
  }

  getLocation() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/location-active`, {});
  }

  storeLocation(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/location-store`, data);
  }
}
