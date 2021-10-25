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
export class ReceivingService {

  constructor(private http: HttpClient) { }

  store(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/receiving-store`, data);
  }

  delete(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/receiving-delete`, data);
  }

  complete(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/receiving-complete`, data);
  }

  getSingle(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/receiving-single`, data);
  }

  getReceiving() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/receiving-all`, {});
  }
}
