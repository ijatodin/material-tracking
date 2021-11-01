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
export class PersonnelService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/personnel-all`, {});
  }

  getGroup() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/personnel-group`, {});
  }

  storePersonnel(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/personnel-store`, data);
  }

  storeSignature(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/personnel-signature`, data);
  }

  delete(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/personnel-delete`, data);
  }
}
