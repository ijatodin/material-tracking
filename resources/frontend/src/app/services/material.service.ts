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
export class MaterialService {

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/material-all`, {});
  }

  storeMaterial(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/material-store`, data);
  }

  search(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/material-search`, data);
  }

  delete(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/material-delete`, data);
  }

}
