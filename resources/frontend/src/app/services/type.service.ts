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
export class TypeService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/type-all`, {});
  }

  storeType(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/setting/type-store`, data);
  }
}
