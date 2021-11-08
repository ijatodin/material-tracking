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
export class SummaryService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/summary-all`, {});
  }

  getSingle(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/summary-single`, data);
  }

  getSingleSubcon(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/summary-singlesubcon`, data);
  }

  generate(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/summary-generate`, data);
  }

  save(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/summary-save`, data);
  }

  approval(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/summary-approval`, data);
  }
}
